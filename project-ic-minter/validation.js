const Joi = require('joi');
const validImpactCores = ['Water', 'Earth', 'Energy', 'Social'];
const validSdgs = [
    'No poverty',
    'Zero hunger',
    'Good health & well-being',
    'Quality education',
    'Gender equality',
    'Clean water & sanitation',
    'Affordable & clean energy',
    'Decent work & economic growth',
    'Industry, innovation & infrastructure',
    'Reduced inequalities',
    'Sustainable cities & communities',
    'Responsible consumption & production',
    'Climate action',
    'Life below water',
    'Life on land',
    'Peace, justice & strong institutions',
    'Partnerships for the goals'
];
const validBountyTypes = [
    'GHG Removal',
    'Data Science',
    'Learning',
    'Harvesting',
    'Scouting',
    'Code',
    'Design',
    'Volunteer',
    'Regenerate',
    'General',
    'Promotion',
    'Survey',
    'Training',
    'Content',
    'Restoration',
    'Gardening',
    'Validate',
    'Research',
    'Writing',
    'Registration',
    'Community',
    'Recycle',
    'Funding'
];
const supportedBlockchains = [ 'optimism sepolia' ];
const blockchainDetails = {
    'optimism sepolia': {
        image: 'assets/optimism.png',
        chainId: 11155420
    }
};
const evmAddressRegex = new RegExp('^0x[a-fA-F0-9]{40}$');

/*
    "projectName": "Sample Project",
	"projectStartDate": "2025-09-18T13:40:40",
    "projectEndDate": "2025-09-25T13:40:40",
    "backerName": "Sample Organisation",
    "backerLogo": "https://orgwebsite.org/sample_image.png",
    "projectDescription": "This project was carried out in Bengaluru to promote rainwater harvesting. Over 20000 households setup rainwater harvesting which can potentially lead to 4000000 litres of water being harvested",
    "totalFundsDeployedUSD": 50000,
    "totalImpactPointsAllocated": 2000000,
    "impactCoresAffected": [ "Water", "Earth", "Energy", "Social"],
    "SDGsAffected": [ "zero hunger", "no poverty" ],
    "bountyTypeWisePassAndFailCount": [
        {
            "type": "Design",
            "passCount": 20,
            "failCount": 5
        },
        {
            "type": "Code",
            "passCount": 23,
            "failCount": 2
        }
    ],
    "paymentTransactionBlockchain": "arbitrum",
    "paymentTransactionHash": "0xsomerandomtransactionhash",
    "paymentTokenAddress": "0xSomerandomaddress",
    "mintBlockchain": "optimism sepolia",
    "receiverAddress": "0xsomerandomaddress"
*/
const requestMinting = {
    body: Joi.object().keys({
        projectName: Joi.string().required(),
        projectStartDate: Joi.date().required(),
        projectEndDate: Joi.date().required(),
        backerName: Joi.string().required(),
        backerLogo: Joi.string().uri().required(),
        projectDescription: Joi.string().required(),
        totalFundsDeployedUSD: Joi.number().required(),
        totalImpactPointsAllocated: Joi.number().required(),
        impactCoresAffected: Joi.array().items(Joi.string().valid(...validImpactCores)).min(1).required(),
        SDGsAffected: Joi.array().items(Joi.string().valid(...validSdgs)).min(1).required(),
        bountyTypeWisePassAndFailCount: Joi.array().items(Joi.object().keys({
            type: Joi.string().valid(...validBountyTypes).required(),
            passCount: Joi.number().integer().min(0).required(),
            failCount: Joi.number().integer().min(0).required()
        }).custom((value, helpers) => {
            if (value.passCount === 0 && value.failCount === 0) {
                return helpers.error("a passed bounty type must have at least one submission")
            }
            return value;
        })).min(1).required(),
        paymentTransactionBlockchain: Joi.string().valid(...supportedBlockchains).required(),
        paymentTransactionHash: Joi.string().required(),
        paymentTokenAddress: Joi.string().pattern(evmAddressRegex).required(),
        mintBlockchain: Joi.string().valid(...supportedBlockchains).required(),
        receiverAddress: Joi.string().pattern(evmAddressRegex).required()
    })
};

const fetchMintStatus = {
    query: Joi.object().keys({
        requestId: Joi.string().required()
    })
};

module.exports = {
    requestMinting,
    fetchMintStatus,
    validImpactCores,
    validSdgs,
    blockchainDetails
};