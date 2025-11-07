const { MongoClient } = require("mongodb");
const { fetchBlockchains, generateMintToken, addMintRequest, fetchMintRequestStatus, fetchOutstandingRequestCount } = require("./controllers");
const createResponse = require("./utils/createResponse");

const cachedClient = new MongoClient(process.env.MONGODB_URI);
exports.handler = async (event) => {
    let response = null;
    try {
        await cachedClient.connect();
        const path = event.path.toLowerCase();
        if (path === "/v1/blockchain") {
            response = await fetchBlockchains(cachedClient);
        } else if (path === "/v1/minttokenrequest") {
            response = await generateMintToken(cachedClient, event);
        } else if (path === "/v1/mintrequest") {
            response = await addMintRequest(cachedClient, event);
        } else if (path === "/v1/mintstatus") {
            response = await fetchMintRequestStatus(cachedClient, event);
        } else if (path === "/v1/outstandingrequestcount") {
            response = await fetchOutstandingRequestCount(cachedClient, event);
        } else {
            response = createResponse(404, { message: "Specified path not found" });
        }
    } catch (error) {
        response = createResponse(500, { message: `Error while processing request: ${error.message}` });
    }
    return response;
};