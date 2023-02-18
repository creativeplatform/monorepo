// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract mockCRTV is ERC20 {
    
    constructor() ERC20("MOCK Creative Organization Token", "mCRTV") {}

    function mintMeTokens(uint _amount) external returns(bool){
        _mint(msg.sender, _amount);
        return true;
    }

    function burn(uint _amount) external returns(bool){
        _burn(msg.sender, _amount);
        return true;
    }
}