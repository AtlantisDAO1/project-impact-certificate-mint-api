const { bytecode } = require("../artifacts/contracts/ImpactCertificateResolver.sol/ImpactCertificateResolver.json");
const { create2Address } = require("../utils/utils.js");

/*
  Deployment script for ImpactCertificateResolver
  
  Parameters:
  - EAS Contract: 0xbD75f629A22Dc1ceD33dDA0b68c546A1c035c458
  - Impact Certificate Contract: 0x1c645BB4b2e1c53242EC7b8721c67dFde8C55a94
  - Stake Duration: 30 days (2592000 seconds)
*/

const main = async () => {
    // Configuration
    const factoryAddr = '0xBE9Ab93c8D2828dC707FFD7F6B42A70ca269AD3c'; // Factory address
    // const easContractAddr = '0x72E1d8ccf5299fb36fEfD8CC4394B8ef7e98Af92'; // EAS contract address for celo
    const easContractAddr = '0xbD75f629A22Dc1ceD33dDA0b68c546A1c035c458'; // EAS contract address for arbitrum
    const impactCertificateAddr = '0x1c645BB4b2e1c53242EC7b8721c67dFde8C55a94'; // Impact Certificate contract address
    const stakeDuration = 30 * 24 * 60 * 60; // 30 days in seconds (2592000)
    const owner = "0x9078092f66c6cc182e4f5f761e6df8aa5ebb1af0";

    console.log("Deployment Configuration:");
    console.log("- EAS Contract:", easContractAddr);
    console.log("- Impact Certificate Contract:", impactCertificateAddr);
    console.log("- Stake Duration:", stakeDuration, "seconds (30 days)");
    console.log("- Factory Address:", factoryAddr);
    console.log("");

    // Get the contract factory

    // Encode constructor arguments
    const constructorArgs = ethers.utils.defaultAbiCoder.encode(
        ["address", "address", "uint256", "address"],
        [easContractAddr, impactCertificateAddr, stakeDuration, owner]
    );

    // Combine bytecode with constructor arguments
    const initCode = bytecode + constructorArgs.slice(2); // Remove '0x' from constructor args

    // Generate salt and calculate CREATE2 address
    const saltHex = ethers.utils.id("project_ic_resolver");
    const create2Addr = create2Address(factoryAddr, saltHex, initCode);
    console.log("Predicted CREATE2 Address:", create2Addr);
    console.log("");

    // Get factory contract
    const Factory = await ethers.getContractFactory("DeterministicDeployFactory");
    const factory = await Factory.attach(factoryAddr);

    // Deploy the contract
    console.log("Deploying ImpactCertificateResolver...");
    const deployTx = await factory.deploy(initCode, saltHex);
    const txReceipt = await deployTx.wait();
    console.log('txReceipt', txReceipt)

    // Get deployed address from event
    const deployedAddress = txReceipt.events.find(ele => ele.eventSignature === 'Deploy(address)').args[0];

    console.log("");
    console.log("✅ Deployment Successful!");
    console.log("Deployed to:", deployedAddress);
    console.log("Transaction Hash:", txReceipt.transactionHash);
    console.log("");
    console.log("Contract Details:");
    console.log("- Resolver Address:", deployedAddress);
    console.log("- EAS Contract:", easContractAddr);
    console.log("- Impact Certificate:", impactCertificateAddr);
    console.log("- Stake Duration:", stakeDuration, "seconds");
};

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
