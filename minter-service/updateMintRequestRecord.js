const { ObjectId } = require("mongodb")

const updateMintRequestRecord = async (client, id, transactionHash) => {
    const db = client.db(process.env.DATABASE_NAME);
    const collection = db.collection("mintrequests");
    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { status: "MINTED", transactionHash } }
    );
};

module.exports = updateMintRequestRecord;