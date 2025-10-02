require('dotenv').config();
const { NodeIrys } = require('@irys/sdk');
const { readFileSync } = require('fs');


// This function returns an object of class NodeIrys, required for uploading data to permanent storage
const getIrys = async () => {
	const providerUrl = process.env.SOLANA_PROVIDER_URL;
	const irys = new NodeIrys({
		url: process.env.IRYS_URL, // URL of the node you want to connect to
		token: "solana", // Token used for payment
		key: JSON.parse(readFileSync(process.env.SOLANA_WALLET)), // ETH or SOL private key
        // `config: { providerUrl }` only specified in case of devnet 
		config: { providerUrl } // Optional provider URL, only required when using Devnet
	});
	return irys;
};

const uploadFileToArweave = async (filePath) => {
    let attemptCount = 1;
    const maxAttempts = Number(process.env.MAX_UPLOAD_ATTEMPTS);
    const irys = await getIrys();
    while (attemptCount <= maxAttempts) {
        try {
            fileReceipt = await irys.uploadFile(filePath);
            return `https://gateway.irys.xyz/${fileReceipt.id}`;
        } catch (error) {
            if (attemptCount === maxAttempts) {
                throw new Error(`Failed to upload file to arweave: ${error}`);
            }
            try {
                await irys.fund(irys.utils.toAtomic(0.05))
            } catch  (error) {
                // introduce some logging functionality here
            }
            attemptCount += 1;
        }
    }
};

const uploadJsonToArweave = async (objectData) => {
    let attemptCount = 1;
    const maxAttempts = Number(process.env.MAX_UPLOAD_ATTEMPTS);
    const irys = await getIrys();
    while (attemptCount <= maxAttempts) {
        try {
            fileReceipt = await irys.upload(JSON.stringify(objectData));
            return `https://gateway.irys.xyz/${fileReceipt.id}`;
        } catch (error) {
            if (attemptCount === maxAttempts) {
                throw new Error(`Failed to upload file to arweave: ${error}`);
            }
            try {
                await irys.fund(irys.utils.toAtomic(0.05))
            } catch  (error) {
                // introduce some logging functionality here
            }
            attemptCount += 1;
        }
    }
};

module.exports = {
    uploadFileToArweave,
    uploadJsonToArweave
}