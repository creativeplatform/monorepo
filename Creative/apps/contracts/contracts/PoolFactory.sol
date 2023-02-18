// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import {Pool} from "./Pool.sol";

interface iTwitterVerify {
    function getVerification(address _user) external returns (bool); //TODO why does this need memory?

    function getTwitterHandle(address _address)
        external
        returns (string memory);
}

interface linkToken {
    function transferFrom(
        address sender,
        address recipient,
        uint256 amount
    ) external returns (bool);
}

interface iRNG {
    function addToWhitelist(address _address) external;
}

contract PoolFactory is Ownable {
    bool public allowPoolCreation;
    mapping(uint256 => address) public poolList;
    uint256 public poolCount;
    address public TWITTER_VERIFY_ADDRESS;
    iTwitterVerify private twitterVerify;
    iRNG private rng;
    linkToken private link;
    address public LINK_CONTRACT_ADDRESS;

    /**
    * @dev emitted when a pool is created
    * @param Pool the address of the pool
    * @param PoolOwner the address of the pool owner
    * @param SubmissionEndTime unix timestamp for when the submission period is over
    * @param FanVotingEndTime unix timestamp for when the fan voting period is over
    * @param BrandVotingEndTime unix timestamp for when the brand voting period is over
    * @param CampaignEndtime unix timestamp for when the campaign is over
    * @param PoolId the id this pool is stored under in poolList
    **/
    event PoolCreated(
        address Pool,
        address PoolOwner,
        uint256 SubmissionEndTime,
        uint256 FanVotingEndTime,
        uint256 BrandVotingEndTime,
        uint256 CampaignEndtime,
        uint256 PoolId
    );

    constructor(
        address _twitterVerifyAddress,
        address linkTokenAddress,
        address rngAddress
    ) {
        TWITTER_VERIFY_ADDRESS = _twitterVerifyAddress;
        twitterVerify = iTwitterVerify(TWITTER_VERIFY_ADDRESS);
        rng = iRNG(rngAddress);
        LINK_CONTRACT_ADDRESS = linkTokenAddress;
        link = linkToken(LINK_CONTRACT_ADDRESS);
    }

    function setTwitterVerifyAddress(address _address) external onlyOwner {
        TWITTER_VERIFY_ADDRESS = _address;
        twitterVerify = iTwitterVerify(TWITTER_VERIFY_ADDRESS);
    }

    function changePoolCreationBool(bool _bool) external onlyOwner {
        allowPoolCreation = _bool;
    }

    function getPoolAddress(uint256 _index) external view returns (address) {
        return poolList[_index];
    }

    function getPoolCount() external view returns (uint256) {
        return poolCount;
    }

    /**
    * @dev Allows caller to create a custom brand pool, as long as they are verified, and have approved the contract to spend 0.1 Link 
    * TODO add require checks to make sure inputs are logical
    **/
    function createPool(
        string memory _poolName,
        uint256 _capital,
        address _capitalAddress,
        address _nftAddress,
        uint256 _campaignLength,
        uint256 _votingLength,
        uint256 _decisionLength,
        uint256 _submissionLength
    ) external {
        require(allowPoolCreation, "Pool creation is currently not allowed!");
        require(
            twitterVerify.getVerification(msg.sender),
            "Caller address is not verified with Twitter!"
        );
        require(
            link.transferFrom(msg.sender, address(rng), 1 * (10**17)),
            "Link transferFrom failed!"
        );
        string memory brandName = twitterVerify.getTwitterHandle(msg.sender);
        Pool pool =
            new Pool(
                _poolName,
                brandName,
                _capital,
                _capitalAddress,
                _nftAddress,
                msg.sender,
                address(rng),
                _campaignLength,
                _votingLength,
                _decisionLength,
                _submissionLength
            );
        uint submissionEndTime;
        uint fanVotingEndTime;
        uint brandVotingEndTime;
        uint campaignEndTime;
        uint256 currentTime = block.timestamp;
        submissionEndTime = currentTime + _submissionLength;
        fanVotingEndTime = submissionEndTime + _votingLength;
        brandVotingEndTime = fanVotingEndTime + _decisionLength;
        campaignEndTime = currentTime + _campaignLength;
        emit PoolCreated(
            address(pool),
            msg.sender,
            submissionEndTime,
            fanVotingEndTime,
            brandVotingEndTime,
            campaignEndTime,
            poolCount
        );
        poolList[poolCount] = address(pool);
        poolCount++;
        rng.addToWhitelist(address(pool));
    }
}
