const getCollection = (client, collectionName) => {
    const db = client.db(process.env.DATABASE_NAME);
    return db.collection(collectionName);
};

const fetchBlockchains = async (client) => {
    const blockchains = await getCollection(client, "blockchains").find({}).toArray();
    for (let i=0; i<blockchains.length; ++i) {
        delete blockchains[i]._id;
    }
    return blockchains;
};

const fetchMintRequest = async (client, filters) => {
    const mintRequest = await getCollection(client, "mintrequests").findOne(filters);
    return mintRequest;
};

const findMintTokenRecord = async (client, mintToken) => {
    const tokenRecord = await getCollection(client, "minttokens").findOne({ mintToken });
    return tokenRecord;
};

const addMintRequest = async (client, metadataURI, paymentTransactionHash, paymentTransactionBlockchain, receiverAddress, ownerAddress, ownerSignature, mintToken, chainName, erc721Address, requestId) => {
    await getCollection(client, "mintrequests").insertOne({
        metadataURI,
        paymentTransactionHash,
        paymentTransactionBlockchain,
        receiverAddress,
        ownerAddress,
        ownerSignature,
        mintToken,
        chainName,
        erc721Address,
        createdAt: new Date(),
        requestId,
        status: "REQUESTED"
    });
};

const addMintToken = async (client, chainName, erc721Address, ownerAddress, mintToken, currentTimestamp) => {
    await getCollection(client, "minttokens").insertOne({
        chainName,
        erc721Address,
        ownerAddress,
        mintToken,
        createdAt: currentTimestamp
    });
};

const fetchOutstandingRequestCount = async (client, chainName, erc721Address) => {
    const requests = await getCollection(client, "mintrequests").find({ chainName, erc721Address, status: "REQUESTED" }).toArray();
    return requests.length;
};

module.exports = {
    fetchBlockchains,
    fetchMintRequest,
    findMintTokenRecord,
    addMintRequest,
    addMintToken,
    fetchOutstandingRequestCount
};