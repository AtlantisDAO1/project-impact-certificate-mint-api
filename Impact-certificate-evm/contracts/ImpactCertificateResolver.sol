// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

// --- EAS Interfaces & Structs ---

struct Attestation {
    bytes32 uid;
    bytes32 schema;
    uint64 time;
    uint64 expirationTime;
    uint64 revocationTime;
    bytes32 refUID;
    address recipient;
    address attester;
    bool revocable;
    bytes data;
}

interface IEAS {
    function getAttestation(bytes32 uid) external view returns (Attestation memory);
}

interface ISchemaResolver {
    function isPayable() external pure returns (bool);
    function attest(Attestation calldata attestation) external payable returns (bool);
    function multiAttest(Attestation[] calldata attestations, uint256[] calldata values) external payable returns (bool);
    function revoke(Attestation calldata attestation) external payable returns (bool);
    function multiRevoke(Attestation[] calldata attestations, uint256[] calldata values) external payable returns (bool);
}

abstract contract SchemaResolver is ISchemaResolver {
    error InsufficientValue();
    error NotPayable();
    error InvalidEAS();
    error InvalidLength();

    IEAS internal immutable _eas;

    constructor(IEAS eas) {
        if (address(eas) == address(0)) {
            revert InvalidEAS();
        }
        _eas = eas;
    }

    modifier onlyEAS() {
        if (msg.sender != address(_eas)) {
            revert InvalidEAS();
        }
        _;
    }

    function isPayable() public pure virtual returns (bool) {
        return false;
    }

    receive() external payable virtual {
        if (!isPayable()) {
            revert NotPayable();
        }
    }

    function attest(Attestation calldata attestation) external payable onlyEAS returns (bool) {
        return onAttest(attestation, msg.value);
    }

    function multiAttest(Attestation[] calldata attestations, uint256[] calldata values) external payable onlyEAS returns (bool) {
        uint256 length = attestations.length;
        if (length != values.length) {
            revert InvalidLength();
        }
        uint256 remainingValue = msg.value;
        for (uint256 i = 0; i < length; ++i) {
            uint256 value = values[i];
            if (value > remainingValue) {
                revert InsufficientValue();
            }
            if (!onAttest(attestations[i], value)) {
                return false;
            }
            unchecked {
                remainingValue -= value;
            }
        }
        return true;
    }

    function revoke(Attestation calldata attestation) external payable onlyEAS returns (bool) {
        return onRevoke(attestation, msg.value);
    }

    function multiRevoke(Attestation[] calldata attestations, uint256[] calldata values) external payable onlyEAS returns (bool) {
        uint256 length = attestations.length;
        if (length != values.length) {
            revert InvalidLength();
        }
        uint256 remainingValue = msg.value;
        for (uint256 i = 0; i < length; ++i) {
            uint256 value = values[i];
            if (value > remainingValue) {
                revert InsufficientValue();
            }
            if (!onRevoke(attestations[i], value)) {
                return false;
            }
            unchecked {
                remainingValue -= value;
            }
        }
        return true;
    }

    function onAttest(Attestation calldata attestation, uint256 value) internal virtual returns (bool);
    function onRevoke(Attestation calldata attestation, uint256 value) internal virtual returns (bool);
}

// --- Impact Certificate Resolver ---

contract ImpactCertificateResolver is SchemaResolver, Ownable {
    using SafeERC20 for IERC20;
    IERC721 public immutable impactCertificate;
    
    // Staking configuration
    mapping(address => bool) public isTokenWhitelisted;
    mapping(address => uint256) public requiredStakeAmount;
    address[] public whitelistedTokenList;
    
    uint256 public stakeDuration; // Duration in seconds

    // User stakes: user => token => amount
    mapping(address => mapping(address => uint256)) public stakes;
    // User stake unlock time: user => token => timestamp
    mapping(address => mapping(address => uint256)) public stakeUnlockTimes;
    
    // Attestation tracking: attester => tokenId => hasAttested
    mapping(address => mapping(uint256 => bool)) public hasAttested;

    event StakeDeposited(address indexed user, address indexed token, uint256 amount);
    event StakeWithdrawn(address indexed user, address indexed token, uint256 amount);
    event TokenWhitelisted(address indexed token, uint256 amount);
    event TokenDeWhitelisted(address indexed token);
    event StakeRequirementUpdated(address indexed token, uint256 newAmount);
    event StakeDurationUpdated(uint256 newDuration);
    event StakeExtended(address indexed user, address indexed token, uint256 newUnlockTime);

    constructor(IEAS eas, IERC721 _impactCertificate, uint256 _stakeDuration, address owner) 
        SchemaResolver(eas) 
        Ownable(owner) // Set deployer as owner
    {
        impactCertificate = _impactCertificate;
        stakeDuration = _stakeDuration;
    }

    // --- Staking Functions ---

    function stake(address token) external {
        require(isTokenWhitelisted[token], "Token not whitelisted");
        uint256 amount = requiredStakeAmount[token];
        require(amount > 0, "Stake amount not set");
        require(stakes[msg.sender][token] == 0, "Already staked");

        stakes[msg.sender][token] = amount;
        stakeUnlockTimes[msg.sender][token] = block.timestamp + stakeDuration;

        IERC20(token).safeTransferFrom(msg.sender, address(this), amount);
        
        emit StakeDeposited(msg.sender, token, amount);
    }

    function withdraw(address token) external {
        uint256 amount = stakes[msg.sender][token];
        require(amount > 0, "No stake to withdraw");
        require(block.timestamp >= stakeUnlockTimes[msg.sender][token], "Stake is locked");

        stakes[msg.sender][token] = 0;
        IERC20(token).safeTransfer(msg.sender, amount);

        emit StakeWithdrawn(msg.sender, token, amount);
    }

    function extendStake(address token) external {
        require(stakes[msg.sender][token] > 0, "No stake to extend");
        
        uint256 newUnlockTime = block.timestamp + stakeDuration;
        stakeUnlockTimes[msg.sender][token] = newUnlockTime;

        emit StakeExtended(msg.sender, token, newUnlockTime);
    }

    function hasSufficientStake(address attester) public view returns (bool) {
        for (uint256 i = 0; i < whitelistedTokenList.length; i++) {
            address token = whitelistedTokenList[i];
            if (isTokenWhitelisted[token]) {
                // Check if user has staked AND the stake is still locked
                // "unlock time not reached" means current time < unlock time
                if (stakes[attester][token] > 0 && block.timestamp < stakeUnlockTimes[attester][token]) {
                    return true;
                }
            }
        }
        return false;
    }

    // --- Resolver Logic ---

    function onAttest(Attestation calldata attestation, uint256 /*value*/) internal override returns (bool) {
        // 1. Decode schema data
        (uint256 tokenId, bool accept, string memory comment) = abi.decode(attestation.data, (uint256, bool, string));

        // 2. Validate NFT exists
        try impactCertificate.ownerOf(tokenId) returns (address owner) {
            require(owner != address(0), "Token does not exist");
        } catch {
            return false; // Or revert with "Token does not exist"
        }

        // 3. Check if attester has already attested this NFT
        require(!hasAttested[attestation.attester][tokenId], "Already attested this NFT");

        // 4. Check stake
        require(hasSufficientStake(attestation.attester), "Insufficient or expired stake");

        // 5. Mark as attested
        hasAttested[attestation.attester][tokenId] = true;

        return true;
    }

    function onRevoke(Attestation calldata attestation, uint256 /*value*/) internal override returns (bool) {
        (uint256 tokenId, , ) = abi.decode(attestation.data, (uint256, bool, string));
        if (hasAttested[attestation.attester][tokenId]) {
             delete hasAttested[attestation.attester][tokenId];
        }
        return true;
    }

    // --- Admin Functions ---

    function whitelistToken(address token, uint256 amount) external onlyOwner {
        require(token != address(0), "Invalid token address");
        require(amount > 0, "Amount must be greater than 0");
        if (!isTokenWhitelisted[token]) {
            isTokenWhitelisted[token] = true;
            whitelistedTokenList.push(token);
        }
        requiredStakeAmount[token] = amount;
        emit TokenWhitelisted(token, amount);
    }

    function removeTokenWhitelist(address token) external onlyOwner {
        require(isTokenWhitelisted[token], "Token not whitelisted");
        isTokenWhitelisted[token] = false;
        // We don't remove from list to preserve index order/gas, just ignore in loop
        emit TokenDeWhitelisted(token);
    }

    function updateRequiredStake(address token, uint256 amount) external onlyOwner {
        require(isTokenWhitelisted[token], "Token not whitelisted");
        require(amount > 0, "Amount must be greater than 0");
        requiredStakeAmount[token] = amount;
        emit StakeRequirementUpdated(token, amount);
    }

    function setStakeDuration(uint256 duration) external onlyOwner {
        require(duration > 0, "Duration must be greater than 0");
        stakeDuration = duration;
        emit StakeDurationUpdated(duration);
    }
}
