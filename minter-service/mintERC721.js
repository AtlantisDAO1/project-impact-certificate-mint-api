const ethers = require("ethers");

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

const mintERC721 = async (chainName, erc721Address, receiverAddress, metadataURI) => {
    const provider = new ethers.JsonRpcProvider(getRpcUrl(chainName));
    const wallet = new ethers.Wallet(process.env.MINT_FEE_PAYER, provider);
    const abi = [
        "function mint(address to, string memory uri) public"
    ];
    const contract = new ethers.Contract(erc721Address, abi, wallet);
    const txResponse = await contract.mint(receiverAddress, metadataURI);
    return txResponse.hash;
};

module.exports = mintERC721;