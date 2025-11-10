const DB = require("./databaseServices");
const { checkFunctionSelectors, isAuthorisedToMint, checkTokenTransfer } = require("./smartContractHelpers");
const generateRandomString = require("./utils/generateRandomString");
const verifySignature = require("./utils/verifySignature");
const createResponse = require("./utils/createResponse");

const fetchBlockchains = async (client) => {
    const blockchains = await DB.fetchBlockchains(client);
    return createResponse(200, blockchains);
};

const generateMintToken = async (client, event) => {
    const {
        chainName,
        erc721Address,
        ownerAddress
    } = JSON.parse(event.body);
    const blockchains = (await DB.fetchBlockchains(client)).map(ele => ele.chainName);
    if (!blockchains.includes(chainName)) {
        return createResponse(400, { message: "Blockchain not supported" });
    }
    const contractCompatible = await checkFunctionSelectors(chainName, erc721Address);
    if (!contractCompatible) {
        return createResponse(400, { message: "ERC721 contract not compatible with the protocol" });
    }
    const mintAuthorised = await isAuthorisedToMint(chainName, erc721Address, ownerAddress);
    console.log("mintAuthorised", mintAuthorised);
    if (!mintAuthorised) {
        return createResponse(400, { message: "Specified address not authorised to mint NFT" });
    }
    const mintToken = generateRandomString(32);
    const now = new Date()
    await DB.addMintToken(client, chainName, erc721Address, ownerAddress, mintToken, now);
    return createResponse(200, {
                                    mintToken,
                                    chainName,
                                    erc721Address,
                                    tokenExpirationTimestamp: new Date(now.getTime() + Number(process.env.TOKEN_VALIDITY_IN_MINS) * 60 * 1000)
                            });
};

const addMintRequest = async (client, event) => {
    const {
        mintToken,
        signature,
        paymentTransactionBlockchain,
        paymentTransactionHash,
        paymentTokenAddress,
        metadataURI,
        receiverAddress
    } = JSON.parse(event.body);
    const tokenRecord = await DB.findMintTokenRecord(client, mintToken);
    if (!tokenRecord) {
        return createResponse(400, { message: "Mint token is invalid" });
    }
    const expirationTimestamp = new Date(tokenRecord.createdAt.getTime() + Number(process.env.TOKEN_VALIDITY_IN_MINS) * 60 * 1000)
    if (new Date() > expirationTimestamp) {
        return createResponse(400, { message: "Mint token is expired" });
    }
    try {
        const isValidSignature =verifySignature(tokenRecord.ownerAddress, tokenRecord.mintToken, signature);
        if (!isValidSignature) {
            return createResponse(400, { message: "Invalid signature passed" });
        }
    } catch (error) {
        return createResponse(400, { message: `Error verifying signature: ${error.message}` });
    }
    
    const blockchains = await DB.fetchBlockchains(client);
    const blockchain = blockchains.find(ele => ele.chainName===paymentTransactionBlockchain);
    if (!blockchain) {
        return createResponse(400, { message: "Blockchain not supported" });
    }
    const mintRequest = await DB.fetchMintRequest(client, { paymentTransactionBlockchain, paymentTransactionHash });
    if (mintRequest) {
        return createResponse(400, { message: "Payment transaction is already used for minting" });
    }
    const paymentToken = blockchain.paymentTokens.find(token => token.tokenAddress.toLowerCase()===paymentTokenAddress.toLowerCase());
    if (!paymentToken) {
        return createResponse(400, { message: "Invalid token specified for payment" });
    }
    try {
        await checkTokenTransfer(blockchain.chainName, paymentTransactionHash, paymentToken.tokenAddress, blockchain.mintFeeReceiverAddress, paymentToken.mintFee, paymentToken.decimals);
    } catch (error) {
        return createResponse(400, { message: `Error while parsing the payment transaction hash: ${error.message}` });
    }
    const requestId = generateRandomString(32);
    await DB.addMintRequest(client, metadataURI, paymentTransactionHash, paymentTransactionBlockchain, receiverAddress, tokenRecord.ownerAddress, signature, mintToken, tokenRecord.chainName, tokenRecord.erc721Address, requestId);
    return createResponse(200, { requestId });
};

const fetchMintRequestStatus = async (client, event) => {
    const mintRequest = await DB.fetchMintRequest(client, { requestId: event.queryStringParameters.requestId });
    if (!mintRequest) {
        return createResponse(404, { message: "No request found with the specified ID" })
    }
    const response = { status: mintRequest.status };
    console.log("mintRequest", mintRequest);
    if (mintRequest.status === "MINTED") {
        response.transactionHash = mintRequest.transactionHash;
    }
    return createResponse(200, response);
};

const fetchOutstandingRequestCount = async (client, event) => {
    const {
        chainName,
        erc721Address
    } = JSON.parse(event.body);
    const requestCount = await DB.fetchOutstandingRequestCount(client, chainName, erc721Address);
    const response = { requestCount };
    return createResponse(200, response);
};

module.exports = {
    fetchBlockchains,
    generateMintToken,
    addMintRequest,
    fetchMintRequestStatus,
    fetchOutstandingRequestCount
};