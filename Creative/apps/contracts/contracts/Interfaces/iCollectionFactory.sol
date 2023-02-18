// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

interface iCollection_Factory {
    function create(string memory name, string memory symbol, string memory baseURI, address owner) external returns (address);

    function getcollection(address owner) external view returns (address);

    function getlength() external view returns (uint);
    
}