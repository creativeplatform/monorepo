// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MockToken is ERC20 {
    constructor(address addr1, address addr2, address addr3, address addr4, address addr5, address addr6, address brand) ERC20("Mock Token", "MOCK"){
        _mint(addr1, 10000 * (10 ** 18));
        _mint(addr2, 10000  * (10 ** 18));
        _mint(addr3, 10000  * (10 ** 18));
        _mint(addr4, 10000 * (10 ** 18));
        _mint(addr5, 10000  * (10 ** 18));
        _mint(addr6, 10000  * (10 ** 18));
        _mint(brand, 100000  * (10 ** 18));
        _mint(brand, 1000  * (10 ** 17)); // Mint brand 0.1 to act as the link token payment
    }
}