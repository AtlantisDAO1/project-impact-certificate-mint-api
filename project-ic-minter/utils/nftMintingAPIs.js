const axios = require('axios');
const ApiError = require('../utils/ApiError');

const fetchMintToken = async (chainName, erc721Address, ownerAddress) => {
    const requestBody = { chainName, erc721Address, ownerAddress };
    try {
        const response = await axios.post(`${process.env.NFT_MINT_PROTOCOL_URL}/mintTokenRequest`, requestBody);
        if (response.status !== 200) {
            throw new Error(`Unexpected response from NFT minting protocol for fetching mint token. Request: ${JSON.stringify(mintTokenFetchingRequestBody)}. Respose = ${JSON.stringifiy(response.body)}`);
        }
        return response.data.mintToken;
    } catch (error) {
        console.log('error encountered in fetching mint token', error);
        throw new ApiError(error.status, error.response.data.message);
    }
};

const createMintRequest = async (
                            mintToken,
                            signature,
                            paymentTransactionBlockchain,
                            paymentTransactionHash,
                            paymentTokenAddress,
                            metadataURI,
                            receiverAddress
                        ) => {
    const requestBody = { mintToken, signature, paymentTransactionBlockchain, paymentTransactionHash, paymentTokenAddress, metadataURI, receiverAddress };
    try {
        const response = await axios.post(`${process.env.NFT_MINT_PROTOCOL_URL}/mintRequest`, requestBody);
        //console.log('response from requesting mint', response)
        console.log('response received from requesting mint')
        if (response.status !== 200) {
            console.log('non 200 status code, so throwing error')
            //console.log('non zero status code, throwing error', response.status)
            throw new Error(`Unexpected response from NFT minting protocol for fetching mint token. Request: ${JSON.stringify(requestBody)}. Respose = ${JSON.stringifiy(response.body)}`);
        }    
        return response.data.requestId;
    } catch (error) {
        console.log('error encountered in requesting mint', error);
        throw new ApiError(error.status, error.response.data.message);
    }
};

const fetchRequestStatus = async (requestId) => {
    try {
        const response = await axios.get(`${process.env.NFT_MINT_PROTOCOL_URL}/mintStatus?requestId=${requestId}`);
        const { status, transactionHash } = response.data;
        return { status, transactionHash };
    } catch (error) {
        console.log('error encountered in fetching mint status', error);
        throw new ApiError(error.status, error.response.data.message);
    }
};

const fetchOutstandingRequestCount = async (chainName, erc721Address) => {
    const requestBody = { chainName, erc721Address };
    try {
        const response = await axios.post(`${process.env.NFT_MINT_PROTOCOL_URL}/outstandingRequestCount`, requestBody);
        if (response.status !== 200) {
            throw new Error(`Unexpected response from NFT minting protocol for fetching outstanding request count. Request: ${JSON.stringify(mintTokenFetchingRequestBody)}. Respose = ${JSON.stringifiy(response.body)}`);
        }
        return response.data.requestCount;
    } catch (error) {
        console.log('error encountered in fetching outstanding request count', error);
        throw new ApiError(error.status, error.response.data.message);
    }
};

module.exports = {
    fetchMintToken,
    createMintRequest,
    fetchRequestStatus,
    fetchOutstandingRequestCount
};