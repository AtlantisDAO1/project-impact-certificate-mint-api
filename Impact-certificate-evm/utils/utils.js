const { ethers } = require("ethers");


const create2Address = (factoryAddress, saltHex, initCode) => {
    const create2Addr = ethers.utils.getCreate2Address(factoryAddress, saltHex, ethers.utils.keccak256(initCode));
    return create2Addr;
}

exports.create2Address = create2Address;