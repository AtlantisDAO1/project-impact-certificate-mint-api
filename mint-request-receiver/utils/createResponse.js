const createResponse = (statusCode, responseBody) => {
    return {
        statusCode,
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(responseBody)
    }
};

module.exports = createResponse;