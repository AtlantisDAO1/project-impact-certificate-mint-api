// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ImpactCertificate is ERC721Enumerable, ERC721URIStorage, Ownable {
    // Mapping to store list of addresses authorized for minting
    mapping(address => bool) public isAuthorized;

    modifier onlyAuthorized(address _toCheck) {
        require(isAuthorized[_toCheck], "Not authorized to perfrom the action");
        _;
    }

    constructor() ERC721("Impact Certificate", "IC") Ownable(payable(0xd645d8D131c4743D17395462987D7eb33BEBC573)) { }

    function authorize(address toAuthorize) public onlyOwner {
        isAuthorized[toAuthorize] = true;
    }
    function unauthorize(address toUnauthorize) public onlyOwner {
        delete isAuthorized[toUnauthorize];
    }
    // function required for protocol compatibility
    function isOwner(address toCheck) public view returns (bool) {
        return isAuthorized[toCheck];
    }

    // Mint with unique metadata URI for each token
    function mint(address to, string memory uri) public onlyAuthorized(msg.sender) {
        uint256 tokenId = totalSupply();
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
    }

    // Update metadata of existing token
    function setTokenURI(uint256 tokenId, string memory uri) public onlyOwner {
        require(_ownerOf(tokenId) != address(0), "Token does not exist");
        _setTokenURI(tokenId, uri);
    } 

    // Withdraw funds
    function withdraw() public onlyOwner {
        uint256 balance = address(this).balance;
        payable(msg.sender).transfer(balance); // use call()  to send eth
    }

    // The following functions are overrides required by Solidity to handle multiple inheritance

    function _update(address to, uint256 tokenId, address auth)
        internal
        override(ERC721, ERC721Enumerable)
        returns (address)
    {
        return super._update(to, tokenId, auth);
    }

    function _increaseBalance(address account, uint128 value)
        internal
        override(ERC721, ERC721Enumerable)
    {
        super._increaseBalance(account, value);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721Enumerable, ERC721URIStorage)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}