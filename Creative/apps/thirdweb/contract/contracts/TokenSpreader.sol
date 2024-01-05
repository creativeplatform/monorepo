// SPDX-License-Identifier: MIT
pragma solidity ^0.8.14;

import { ISuperToken } from "@superfluid-finance/ethereum-contracts/contracts/apps/SuperAppBase.sol";
import { SuperTokenV1Library } from "@superfluid-finance/ethereum-contracts/contracts/apps/SuperTokenV1Library.sol";
import "@thirdweb-dev/contracts/extension/Permissions.sol";
import "@thirdweb-dev/contracts/extension/ContractMetadata.sol";



contract TokenSpreader {

    ISuperToken public spreaderToken;// Token to be distributed to unit holders with distribute() function
    /// @notice SuperToken Library
    using SuperTokenV1Library for ISuperToken;
    uint32 public constant INDEX_ID = 0;// The IDA Index. Since this contract will only use one index, we'll hardcode it to "0".

    constructor(ISuperToken _spreaderToken) {
        spreaderToken = _spreaderToken;

        // Creates the IDA Index through which tokens will be distributed
        _spreaderToken.createIndex(INDEX_ID);
    }

    /// @notice Takes the entire balance of the designated spreaderToken in the contract and distributes it out to unit holders w/ IDA
    function distribute() public {
        uint256 spreaderTokenBalance = spreaderToken.balanceOf(address(this));

        (uint256 actualDistributionAmount, ) = spreaderToken.calculateDistribution(
            address(this),
            INDEX_ID,
            spreaderTokenBalance
        );

        spreaderToken.distribute(INDEX_ID, actualDistributionAmount);
    }

    /// @notice lets an account gain a single distribution unit
    /// @param subscriber subscriber address whose units are to be incremented
    function gainShare(address subscriber) public {
        // Get current units subscriber holds
        (, , uint256 currentUnitsHeld, ) = spreaderToken.getSubscription(
            address(this),
            INDEX_ID,
            subscriber
        );

        // Update to current amount + 1
        spreaderToken.updateSubscriptionUnits(
            INDEX_ID,
            subscriber,
            uint128(currentUnitsHeld + 1)
        );
    }

    /// @notice lets an account lose a single distribution unit
    /// @param subscriber subscriber address whose units are to be decremented
    function loseShare(address subscriber) public {
        // Get current units subscriber holds
        (, , uint256 currentUnitsHeld, ) = spreaderToken.getSubscription(
            address(this),
            INDEX_ID,
            subscriber
        );

        // Update to current amount - 1 (reverts if currentUnitsHeld - 1 < 0, so basically if currentUnitsHeld = 0)
        spreaderToken.updateSubscriptionUnits(
            INDEX_ID,
            subscriber,
            uint128(currentUnitsHeld - 1)
        );
    }

    /// @notice allows an account to delete its entire subscription this contract
    /// @param subscriber subscriber address whose subscription is to be deleted
    function deleteShares(address subscriber) public {
        spreaderToken.deleteSubscription(address(this), INDEX_ID, subscriber);
    }


}