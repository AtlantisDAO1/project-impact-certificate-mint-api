require("@nomiclabs/hardhat-ethers");
require("dotenv").config();
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const { task } = require("hardhat/config");
const {
  API_URL_OPTIMISM_SEPOLIA,
  API_URL_BASE_SEPOLIA,
  API_URL_CELO,
  API_URL_ARBITRUM,
  API_URL_OPTIMISM,
  API_URL_BASE,
  PRIVATE_KEY,
} = process.env;

task("account", "returns nonce and balance for specified address on multiple networks")
  .addParam("address")
  .setAction(async address => {
    const web3OpSepolia = createAlchemyWeb3(API_URL_OPTIMISM_SEPOLIA);
    const web3BaseSepolia = createAlchemyWeb3(API_URL_BASE_SEPOLIA);
    const web3Celo = createAlchemyWeb3(API_URL_CELO);
    const web3Arbitrum = createAlchemyWeb3(API_URL_ARBITRUM);
    const web3Optimism = createAlchemyWeb3(API_URL_OPTIMISM);
    const web3Base = createAlchemyWeb3(API_URL_BASE);

    const networkIDArr = ["Optimism Sepolia:", "Base Sepolia:", "Celo:", "Arbitrum:", "Optimism:", "Base:"]
    const providerArr = [web3OpSepolia, web3BaseSepolia, web3Celo, web3Arbitrum, web3Optimism, web3Base];
    const resultArr = [];
    
    for (let i = 0; i < providerArr.length; i++) {
      const nonce = await providerArr[i].eth.getTransactionCount(address.address, "latest");
      const balance = await providerArr[i].eth.getBalance(address.address)
      resultArr.push([networkIDArr[i], nonce, parseFloat(providerArr[i].utils.fromWei(balance, "ether")).toFixed(5) + "ETH"]);
    }
    resultArr.unshift(["  |NETWORK|   |NONCE|   |BALANCE|  "])
    console.log(resultArr);
  });

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.20",
  networks: {
    hardhat: {},
    optimismSepolia: {
      url: API_URL_OPTIMISM_SEPOLIA,
      accounts: [`0x${PRIVATE_KEY}`],
    },
    baseSepolia: {
      url: API_URL_BASE_SEPOLIA,
      accounts: [`0x${PRIVATE_KEY}`],
    },
    celo: {
      url: API_URL_CELO,
      accounts: [`0x${PRIVATE_KEY}`],
    },
    arbitrum: {
      url: API_URL_ARBITRUM,
      accounts: [`0x${PRIVATE_KEY}`],
    },
    optimism: {
      url: API_URL_OPTIMISM,
      accounts: [`0x${PRIVATE_KEY}`],
    },
    base: {
      url: API_URL_BASE,
      accounts: [`0x${PRIVATE_KEY}`],
    },
  }
};