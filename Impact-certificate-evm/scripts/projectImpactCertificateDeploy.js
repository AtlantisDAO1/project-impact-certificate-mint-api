const { bytecode } = require("../artifacts/contracts/ProjectImpactCertificate.sol/ImpactCertificate.json");
const { create2Address } = require("../utils/utils.js");

/*
  factory address for arbitrum, base, celo, optimism: 0xBE9Ab93c8D2828dC707FFD7F6B42A70ca269AD3c
*/

const main = async () => {
    // const factoryAddr = '0xD43456EA0882Db400D3478f8Fa2ED054cA2E4d21';
    // const factoryAddr = '0xc1d35E3e02E58F44b4d7C0F070Bc6085c8c64E39' // optimism sepolia
    // const factoryAddr = '0x4cfc91daccCd35c6422C50e5C19E3B1C557114b7'; // base sepolia
    const factoryAddr = '0xBE9Ab93c8D2828dC707FFD7F6B42A70ca269AD3c';
    const initCode = bytecode;
    const saltHex = ethers.utils.id("project_impact_certificate");
    const create2Addr = create2Address(factoryAddr, saltHex, initCode);
    console.log("Address", create2Addr);
    
    const Factory = await ethers.getContractFactory("DeterministicDeployFactory");
    const factory = await Factory.attach(factoryAddr);

    const icDeploy = await factory.deploy(initCode, saltHex);
    const txReceipt = await icDeploy.wait();
    console.log(txReceipt);
    console.log("Deployed to:", txReceipt.events.find(ele => ele.eventSignature === 'Deploy(address)').args[0]);
    
};

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
});