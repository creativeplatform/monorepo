// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

import "@chainlink/contracts/src/v0.6/ChainlinkClient.sol";
import "@chainlink/contracts/src/v0.6/vendor/Ownable.sol";

interface linkToken {
    function transferFrom(
        address sender,
        address recipient,
        uint256 amount
    ) external returns (bool);
}

contract twitterverify is ChainlinkClient, Ownable {
    address private oracle;
    uint256 private fee;
    bytes32 private verifyUserJobId;

    struct userVerification {
        bytes32 requestId;
        bool verified;
        string twitterHandle;
    }

    mapping(address => userVerification) public verificationMap;

    /**
     * @dev emitted when verifyUser is called
     * @param requestId the requestId associated with the verification job
     * @param twitterHandle the twitter handle the user is attempting to verify ownership of
     * @param user the address of the caller
     **/
    event AttemptToVerify(
        bytes32 requestId,
        string twitterHandle,
        address user
    );

    /**
     * @dev emitted when a successful verification occurs
     * @param requestId the requestId associated with the successful verification job
     * @param twitterHandle the twitter handle the user has verified ownership of
     * @param user the address that owns the aforementioned twitter handle
     **/
    event VerificationSuccess(
        bytes32 requestId,
        string twitterHandle,
        address user
    );

    /**
     * @dev emitted when a verification fails
     * @param requestId the requestId associated with the failing verification job
     **/
    event VerificationFailed(bytes32 requestId);

    address public LINK_CONTRACT_ADDRESS =
        0x326C977E6efc84E512bB9C30f76E30c160eD06FB;
    linkToken link = linkToken(LINK_CONTRACT_ADDRESS);

    constructor() public {
        //setPublicChainlinkToken();
        setChainlinkToken(0x326C977E6efc84E512bB9C30f76E30c160eD06FB);
        oracle = 0x0e70fe151Fa8A1477D4E2a42028DB8a231D2C827; // oracle address
        verifyUserJobId = "9ddae3a5bd6547d590eb5ccaeab1429e"; //job id
        fee = 1 * 10**17; // 0.1 LINK
    }

    function setJobId(bytes32 _jobId) external onlyOwner {
        verifyUserJobId = _jobId;
    }

    /**
     * @dev allows owner to create test users for contract testing.
     * Test users will always have the twitter handle ***TEST_USER*** so that
     * they are easily recognizable as a test user
     **/
    function createTestUser(address _address) external onlyOwner {
        userVerification memory testUser =
            userVerification({
                requestId: 0,
                verified: true,
                twitterHandle: "***TEST_USER***"
            });
        verificationMap[_address] = testUser;
        emit VerificationSuccess(
            testUser.requestId,
            testUser.twitterHandle,
            _address
        );
    }

    /**
     * @dev submit a verification job to the oracle. Users latest tweet must contain
     * the address they called this function with!!!
     **/
    function verifyUser(string memory _userHandle) public returns (bytes32) {
        require(
            link.transferFrom(msg.sender, address(this), fee),
            "transferFrom failed"
        );
        verificationMap[msg.sender].verified = false;
        verificationMap[msg.sender].twitterHandle = _userHandle;
        Chainlink.Request memory req =
            buildChainlinkRequest(
                verifyUserJobId,
                address(this),
                this.fulfill_verify.selector
            );
        req.add("handle", _userHandle);
        bytes32 Id = sendChainlinkRequestTo(oracle, req, fee);
        verificationMap[msg.sender].requestId = Id;
        emit AttemptToVerify(Id, _userHandle, msg.sender);
        return Id;
    }

    /**
     * @dev Called by the oracle once the verification job is complete
     **/
    function fulfill_verify(bytes32 _requestId, uint256 _address)
        public
        recordChainlinkFulfillment(_requestId)
    {
        address user = address(_address);
        if (user == address(0)) {
            emit VerificationFailed(_requestId);
            revert("Error occurred during verification!");
        }
        if (verificationMap[user].requestId == _requestId) {
            verificationMap[user].verified = true;
            emit VerificationSuccess(
                _requestId,
                verificationMap[user].twitterHandle,
                user
            );
        }
    }

    function getVerification(address _address) external view returns (bool) {
        return verificationMap[_address].verified;
    }

    function getTwitterHandle(address _address)
        external
        view
        returns (string memory)
    {
        return verificationMap[_address].twitterHandle;
    }
}
