const { MongoClient } = require("mongodb");
const mintERC721 = require("./mintERC721");
const updateMintRequestRecord = require("./updateMintRequestRecord");

const cachedClient = new MongoClient(process.env.MONGODB_URI);

exports.handler = async (event) => {
    try {
        await cachedClient.connect();
        const {
            _id,
            metadataURI,
            receiverAddress,
            chainName,
            erc721Address
        } = JSON.parse(event.body);
        const transactionHash = await mintERC721(chainName, erc721Address, receiverAddress, metadataURI);
        await updateMintRequestRecord(cachedClient, _id, transactionHash);
        return {
            statusCode: 200,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ success: true })
        };
    } catch (error) {
        return {
            statusCode: 500,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ message: `Error: ${error.message}` })
        };
    }
    

};