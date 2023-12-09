// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract DAIToken is ERC20, Ownable {
    // Constructor to initialize the token with a name, symbol, and initial supply
    constructor() ERC20("DAI Token", "DAI") {
        // Mint initial supply to the contract deployer (you)
        _mint(msg.sender, 1000000000000000000000000); // 1,000 DAI with 18 decimals
    }

    // Function to mint additional tokens (only callable by the owner)
    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }

    // Function to burn tokens (only callable by the owner)
    function burn(uint256 amount) public onlyOwner {
        _burn(msg.sender, amount);
    }
}
