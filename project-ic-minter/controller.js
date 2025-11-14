const axios = require('axios');
const { mkdirSync, existsSync, readdirSync, statSync, unlinkSync, rmdirSync } = require('fs');
const fs = require('fs');
const path = require('path')
const { ethers } = require('ethers');
const httpStatus = require('http-status');
const generateProjectCertificateImage = require('./utils/imageGeneration/imageGeneratorV1');
const generateProjectCertificateImageV2 = require('./utils/imageGeneration/imageGeneratorV2');
const { validImpactCores, validSdgs, sdgToSubTargets, blockchainDetails } = require('./validation');
const { uploadFileToArweave, uploadJsonToArweave } = require('./utils/arweaveUploader');
const { fetchMintToken, validateTransaction, createMintRequest, fetchRequestStatus, fetchOutstandingRequestCount } = require('./utils/nftMintingAPIs');
const ApiError = require('./utils/ApiError');


const catchAsync = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch((err) => {
    next(err)
  });
};

const getRpcUrl = (chainId) => {
    const idAndUrls = process.env.EVM_RPC_URL.split('~');
    for (let i=0; i<idAndUrls.length; ++i) {
        const [id, url] = idAndUrls[i].split(',');
        if (chainId.toString()===id) {
            return url;
        }
    }
    return null;
}

const deleteDirectoryRecursive = (directoryPath) => {
    if (existsSync(directoryPath)) {
        readdirSync(directoryPath).forEach((file) => {
        const currentPath = path.join(directoryPath, file);
  
        if (statSync(currentPath).isDirectory()) {
          // Recursive call for directories
          deleteDirectoryRecursive(currentPath);
        } else {
          // Delete file
          unlinkSync(currentPath);
        }
      });
  
      // Delete the empty directory itself
      rmdirSync(directoryPath);
    } else {
      console.error(`Directory ${directoryPath} does not exist.`);
    }
};

const fetchNextTokenId = async (mintBlockchain) => {
    // if the calculated token ID is consistent from 3 sequential calculations, return it
    let consistentValueCount = 0;
    const provider = new ethers.JsonRpcProvider(getRpcUrl(blockchainDetails[mintBlockchain].chainId));
    const abi = [ "function totalSupply() public view returns (uint256)" ];
    const contract = new ethers.Contract(process.env.PROJECT_IMPACT_CERTIFICATE_CONTRACT_ADDRESS, abi, provider);
    let totalSupply;
    let outstandingRequests;
    let tokenId = null;
    const MAX_CALCULATION_ATTEMPTS = 10;
    for (let i=0; i<MAX_CALCULATION_ATTEMPTS; ++i) {
        totalSupply = Number(await contract.totalSupply());
        outstandingRequests = await fetchOutstandingRequestCount(mintBlockchain, process.env.PROJECT_IMPACT_CERTIFICATE_CONTRACT_ADDRESS);
        if (tokenId === totalSupply + outstandingRequests) {
            consistentValueCount += 1;
        } else {
            tokenId = totalSupply + outstandingRequests;
            consistentValueCount = 0;
        }
        if (consistentValueCount === 3) {
            return tokenId;
        }
        await new Promise(resolve => setTimeout(resolve, 500));
    }
    // could not achieve consistent token ID for 3 sequential calculations
    return null;
};

const requestMinting = catchAsync(async (req, res) => {
    const {
        projectName, 
        projectStartDate, 
        projectEndDate, 
        backerName, 
        backerLogo, 
        projectDescription, 
        totalFundsDeployedUSD, 
        totalImpactPointsAllocated, 
        impactCoresAffected, 
        SDGsAffected, 
        bountyTypeWisePassAndFailCount, 
        paymentTransactionBlockchain, 
        paymentTransactionHash, 
        paymentTokenAddress,
        mintBlockchain,
        receiverAddress
    } = req.body;
/*
    projectTitle,
    projectStartDate, // e.g. 12 May, 2025
    projectEndDate, // e.g. 09 Aug, 2025
    backer, // will include image & name
    fundsDeployedUSD,
    impactPointsIssued,
    projectBrief,
    coreStatuses,
    projectSdgs,
    uniqueBountyAcceptanceCounts, // type, passCount, failCount
    mintingDate,
    mintBlockchain, // will include image & name
    tokenId,
    fileLocation,
    preview = false
*/

    // verify payment details
    const result = await validateTransaction(paymentTransactionBlockchain, paymentTransactionHash, paymentTokenAddress)
    if (!result.valid) {
        throw new ApiError(httpStatus.BAD_REQUEST, `Invalid payment details: ${result.message}`);
    }

    // prepare data to be sent to image generator function
    const tempFolderPath = `temporary/${new Date().getTime()}`;
    mkdirSync(tempFolderPath, { recursive: true });
    const getFormattedDate = date => date.toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' });
    const projectStartDateString = getFormattedDate(new Date(projectStartDate));
    const projectEndDateString = getFormattedDate(new Date(projectEndDate));
    const organisationLogo = path.join(tempFolderPath, 'organisationLogo.png');
    let response = await axios({
        url: backerLogo,
        method: 'GET',
        responseType: 'arraybuffer',
    });
    await fs.promises.writeFile(organisationLogo, response.data);
    const backer = {
        name: backerName,
        image: organisationLogo
    };
    const coreStatuses = validImpactCores.map(core => impactCoresAffected.includes(core));
    const projectSdgs = SDGsAffected.map(sdg => validSdgs.indexOf(sdg));
    const mintingDateString = getFormattedDate(new Date());
    const mintBlockchainDetails = {
        name: mintBlockchain,
        image: blockchainDetails[mintBlockchain].image
    };

    const tokenId = await fetchNextTokenId(mintBlockchain);
    if (tokenId === null) {
        throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Could not calculate the token ID to be allocated to impact certificate')
    }

    const imageFileLocation = tempFolderPath + '/certificateImage.png';

    const totalEntry = bountyTypeWisePassAndFailCount.reduce(
                                                            (acc, curr) => {
                                                                acc.passCount += curr.passCount;
                                                                acc.failCount += curr.failCount;
                                                                return acc;
                                                            }, 
                                                            { type: 'Total', passCount: 0, failCount: 0 }
                                                        );                  
    bountyTypeWisePassAndFailCount.splice(0, 0, totalEntry);
    // only 5 entries can be displayed in the impact certificate
    if (bountyTypeWisePassAndFailCount.length > 5) {
        const othersEntry = bountyTypeWisePassAndFailCount.slice(4).reduce(
                                                        (acc, curr) => {
                                                            acc.passCount += curr.passCount;
                                                            acc.failCount += curr.failCount;
                                                            return acc;
                                                        }, { type: 'Others', passCount: 0, failCount: 0 }
                                                    );
        bountyTypeWisePassAndFailCount.splice(4); 
        bountyTypeWisePassAndFailCount.push(othersEntry);
    }
    await generateProjectCertificateImage(
                                    projectName,
                                    projectStartDateString,
                                    projectEndDateString,
                                    backer,
                                    totalFundsDeployedUSD,
                                    totalImpactPointsAllocated,
                                    projectDescription,
                                    coreStatuses,
                                    projectSdgs,
                                    bountyTypeWisePassAndFailCount,
                                    mintingDateString,
                                    mintBlockchainDetails,
                                    tokenId,
                                    imageFileLocation
                                );
    const offChainMetadata = {
        name: "Impact Certificate",
        description: "Certificate awarded for creating impact by carrying out a project",
        image: "", // image will be uploaded first to obtain the URI
        external_url: process.env.ATLANTIS_WEBSITE_URL,
        attributes: [
            { trait_type: 'project_title', value: projectName },
            { trait_type: 'project_start_date', value: projectStartDateString },
            { trait_type: 'estimated_project_end_date', value: projectEndDateString },
            { trait_type: 'cores', value: impactCoresAffected },
            { trait_type: 'sdgs', value: SDGsAffected },
            { trait_type: 'project_backer', value: backerName },
            { trait_type: 'total_funds_deployed_USD', value: totalFundsDeployedUSD },
            { trait_type: 'total_impact_points_rewarded', value: totalImpactPointsAllocated },
            { trait_type: 'impact_brief', value: projectDescription },
            { trait_type: 'submission_distribution', value: bountyTypeWisePassAndFailCount },
            { trait_type: 'token_id', value: tokenId } 
        ]
    };
    const imageLink = await uploadFileToArweave(imageFileLocation);
    offChainMetadata.image = imageLink;
    const metadataLink = await uploadJsonToArweave(offChainMetadata);
    deleteDirectoryRecursive(tempFolderPath);

    const mintToken = await fetchMintToken(mintBlockchain, process.env.PROJECT_IMPACT_CERTIFICATE_CONTRACT_ADDRESS, process.env.PROJECT_IMPACT_CERTIFICATE_ISSUER_ADDRESS);
    const wallet = new ethers.Wallet(process.env.PROJECT_IMPACT_CERTIFICATE_ISSUER);
    const signature = await wallet.signMessage(mintToken);
    const requestId = await createMintRequest(mintToken, signature, paymentTransactionBlockchain, paymentTransactionHash, paymentTokenAddress, metadataLink, receiverAddress);
    return res.json({ requestId, tokenId, imageUri: imageLink, metadataUri: metadataLink });
});

const requestMintingV2 = catchAsync(async (req, res) => {
    /*
    // prepare data to be sent to image generator function
    const tempFolderPath = `temporary/${new Date().getTime()}`;
    mkdirSync(tempFolderPath, { recursive: true });

    const imageFileLocation = tempFolderPath + '/certificateImage.png';
    await generateProjectCertificateImageV2(
                                    'Resilient Water Network',
                                    '22 Dec, 2023',
                                    '22 Dec, 2024',
                                    {
                                        name: 'Lorem ipsum dolor sit amet consectetur. Senectus id venenatis ultricies ut maecenas sagittis euismod.',
                                        image: 'assets/arbitrum.png'
                                    },
                                    500000000,
                                    'Lorem ipsum dolor sit amet consectetur. Ipsum aliquam fusce nisl tempor turpis gravida consequat eget in. Cursus ut odio vulputate dictumst nullam turpis auctor sit turpis ut diam condimentum maecenas. Cursus ut odio vulputate dictumst nullam turpis auctor sit turpis ut diam condimentum maecenas. vulputate dictumst nullam turpis auctor sit turpis ut diam condimentum maecenas.',
                                    [false,false,true,true],
                                    6,
                                    'Lorem ipsum dolor sit amet consectetur. Consequat egestas nec et ac sapien laoreet maecenas faucibus.',
                                    'Lorem ipsum dolor sit amet consectetur. Consequat egestas nec et ac sapien laoreet maecenas faucibus.',
                                    '22 Dec, 2024',
                                    { name: 'celo', image: 'assets/celo.png'},
                                    15,
                                    imageFileLocation
                                );
    return res.json({ imageFileLocation }); */

    const {
        projectName, 
        projectStartDate, 
        projectEndDate, 
        backerName, 
        backerLogo, 
        projectDescription, 
        totalFundsDeployedUSD, 
        impactCoresAffected, 
        impactBrief,
        paymentTransactionBlockchain, 
        paymentTransactionHash, 
        paymentTokenAddress,
        mintBlockchain,
        receiverAddress
    } = req.body;


    // verify payment details
    const result = await validateTransaction(paymentTransactionBlockchain, paymentTransactionHash, paymentTokenAddress)
    if (!result.valid) {
        throw new ApiError(httpStatus.BAD_REQUEST, `Invalid payment details: ${result.message}`);
    }

    if (!sdgToSubTargets[impactBrief.SDG].includes(impactBrief.subTarget)) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Specified sub-target does not match with the specified SDG');
    }

    // prepare data to be sent to image generator function
    const tempFolderPath = `temporary/${new Date().getTime()}`;
    mkdirSync(tempFolderPath, { recursive: true });
    const getFormattedDate = date => date.toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' });
    const projectStartDateString = getFormattedDate(new Date(projectStartDate));
    const projectEndDateString = getFormattedDate(new Date(projectEndDate));
    const organisationLogo = path.join(tempFolderPath, 'organisationLogo.png');
    let response = await axios({
        url: backerLogo,
        method: 'GET',
        responseType: 'arraybuffer',
    });
    await fs.promises.writeFile(organisationLogo, response.data);
    const backer = {
        name: backerName,
        image: organisationLogo
    };
    const coreStatuses = validImpactCores.map(core => impactCoresAffected.includes(core));
    const sdgIndex = validSdgs.indexOf(impactBrief.SDG)
    const mintingDateString = getFormattedDate(new Date());
    const mintBlockchainDetails = {
        name: mintBlockchain,
        image: blockchainDetails[mintBlockchain].image
    };

    const tokenId = await fetchNextTokenId(mintBlockchain);
    if (tokenId === null) {
        throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Could not calculate the token ID to be allocated to impact certificate')
    }

    const imageFileLocation = tempFolderPath + '/certificateImage.png';
    await generateProjectCertificateImageV2(
                                    projectName,
                                    projectStartDateString,
                                    projectEndDateString,
                                    backer,
                                    totalFundsDeployedUSD,
                                    projectDescription,
                                    coreStatuses,
                                    sdgIndex,
                                    impactBrief.subTarget,
                                    impactBrief.impactIndicator,
                                    mintingDateString,
                                    mintBlockchainDetails,
                                    tokenId,
                                    imageFileLocation
                                );
    const offChainMetadata = {
        name: "Impact Certificate",
        description: "Certificate awarded for creating impact by carrying out a project",
        image: "", // image will be uploaded first to obtain the URI
        external_url: process.env.ATLANTIS_WEBSITE_URL,
        attributes: [
            { trait_type: 'project_title', value: projectName },
            { trait_type: 'project_start_date', value: projectStartDateString },
            { trait_type: 'estimated_project_end_date', value: projectEndDateString },
            { trait_type: 'cores', value: impactCoresAffected },
            { trait_type: 'sdg', value: impactBrief.SDG },
            { trait_type: 'sdgs_sub_target', value: impactBrief.subTarget },
            { trait_type: 'impact_metric', value: impactBrief.impactIndicator },
            { trait_type: 'project_backer', value: backerName },
            { trait_type: 'total_funds_deployed_USD', value: totalFundsDeployedUSD },
            { trait_type: 'impact_brief', value: projectDescription },
            { trait_type: 'token_id', value: tokenId } 
        ]
    };
    const imageLink = await uploadFileToArweave(imageFileLocation);
    offChainMetadata.image = imageLink;
    const metadataLink = await uploadJsonToArweave(offChainMetadata);
    deleteDirectoryRecursive(tempFolderPath);

    const mintToken = await fetchMintToken(mintBlockchain, process.env.PROJECT_IMPACT_CERTIFICATE_CONTRACT_ADDRESS, process.env.PROJECT_IMPACT_CERTIFICATE_ISSUER_ADDRESS);
    const wallet = new ethers.Wallet(process.env.PROJECT_IMPACT_CERTIFICATE_ISSUER);
    const signature = await wallet.signMessage(mintToken);
    const requestId = await createMintRequest(mintToken, signature, paymentTransactionBlockchain, paymentTransactionHash, paymentTokenAddress, metadataLink, receiverAddress);
    return res.json({ requestId, tokenId, imageUri: imageLink, metadataUri: metadataLink });
});

const fetchMintStatus = catchAsync(async (req, res) => {
    const response = await fetchRequestStatus(req.query.requestId);
    return res.json(response);
});

module.exports = {
    requestMinting,
    requestMintingV2,
    fetchMintStatus
};