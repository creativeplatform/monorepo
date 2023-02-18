// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract mockRNG is Ownable{
    uint public number;
    address[] whitelist;
    uint whitelistCount;

    constructor(){}

    function getRandomNumber(uint seed) external returns(bytes32 requestId){
        number = seed;
        return "testId";
    }

    function seeRandomNumber() external view returns(uint){
        return number;
    }

    function addToWhitelist(address _address) external onlyOwner{
        whitelist.push(_address);
        whitelistCount++;
    }
}