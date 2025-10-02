const ethers = require("ethers");

// Function signatures to check
const requiredFunctionSignatures = [
  'mint(address,string)',
  'isOwner(address)'
];

const getRpcUrl = (chain) => {
    const idAndUrls = process.env.EVM_RPC_URL.split('~');
    for (let i=0; i<idAndUrls.length; ++i) {
        const [chainName, url] = idAndUrls[i].split(',');
        if (chainName===chain) {
            return url;
        }
    }
    return null;
}


const checkFunctionSelectors = async (chainName, contractAddress) => {
  const provider = new ethers.JsonRpcProvider(getRpcUrl(chainName));
  const bytecode = await provider.getCode(contractAddress);
  if (!bytecode || bytecode === '0x') {
    return false;
  }

  for (const sig of requiredFunctionSignatures) {
    const selector = ethers.id(sig).slice(0, 10); // '0x' + first 8 chars = 4-byte selector
    const exists = bytecode.includes(selector.slice(2)); // remove '0x' before checking
    if (!exists) {
        return false;
    }
  }
  return true;
};

const isAuthorisedToMint = async (chainName, contractAddress, ownerAddress) => {
  const provider = new ethers.JsonRpcProvider(getRpcUrl(chainName));
  const abi = ["function isOwner(address owner) view returns (bool)"];
  const contract = new ethers.Contract(contractAddress, abi, provider);
  const result = await contract.isOwner(ownerAddress);
  return result;
};


// --- Config ---
const provider = new ethers.JsonRpcProvider("https://your.rpc.url"); // Replace with your RPC
const txHash = "0x..."; // Your transaction hash
const tokenAddress = "0x..."; // ERC20 token contract address
const recipientAddress = "0x..."; // Recipient address
const expectedAmount = ethers.parseUnits("10", 18); // Replace "10" and "18" with your amount and token decimals

// ERC20 Transfer event topic

const checkTokenTransfer = async (chainName, txHash, tokenAddress, recipientAddress, expectedAmount, decimals) => {
  const provider = new ethers.JsonRpcProvider(getRpcUrl(chainName));
  const txReceipt = await provider.getTransactionReceipt(txHash);
  const TRANSFER_TOPIC = ethers.id("Transfer(address,address,uint256)");
  const expectedAmountRaw = ethers.parseUnits(expectedAmount.toString(), decimals);
  if (!txReceipt) {
    throw new Error("Transaction receipt not found");
  }

  const logs = txReceipt.logs.filter(log =>
    log.address.toLowerCase() === tokenAddress.toLowerCase() &&
    log.topics[0] === TRANSFER_TOPIC
  );

  for (const log of logs) {
    const to = ethers.getAddress("0x" + log.topics[2].slice(26));
    const amount = ethers.getBigInt(log.data);

    if (to.toLowerCase() !== recipientAddress.toLowerCase()) {
      throw new Error("Mint fee not sent to the expected address");
    } else if (amount < expectedAmountRaw) {
      throw new Error("Insufficient fee paid for minting");
    } else {
      return
    }
  }
  throw new Error("Transaction hash does not correspond to mint reqeuest fee payment")
};


module.exports = {
  checkFunctionSelectors,
  isAuthorisedToMint,
  checkTokenTransfer
};