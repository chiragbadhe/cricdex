// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract CricDex is Ownable {
    IERC20 public daiToken;

    // Mapping to store user balances for each cricketer
    mapping(uint256 => mapping(address => uint256))
        public cricketerUserBalances;

    // Mapping to store cricketer names
    mapping(uint256 => string) public cricketerNames;

    // Mapping to store cricketer scores
    mapping(uint256 => uint256) public cricketerScores;

    // Events to log important transactions
    event Deposit(
        address indexed depositor,
        uint256 cricketerId,
        uint256 amount
    );
    event Withdrawal(
        address indexed recipient,
        uint256 cricketerId,
        uint256 amount
    );
    event AddCricketer(uint256 cricketerId, string name, uint256 score);

    // Constructor to initialize the contract with the DAI token address
    constructor(address _daiTokenAddress) {
        daiToken = IERC20(_daiTokenAddress);
    }

    // Fallback function to prevent accidental Ether transfers to the contract
    receive() external payable {
        revert("Contract does not accept Ether");
    }

    // Function for users to deposit DAI for a specific cricketer
    function deposit(uint256 cricketerId, uint256 amount) external {
        require(amount > 0, "Amount must be greater than 0");
        require(
            daiToken.allowance(msg.sender, address(this)) >= amount,
            "Not enough allowance"
        );

        // Update the user's balance for the specified cricketer
        cricketerUserBalances[cricketerId][msg.sender] += amount;

        // Transfer DAI from the sender to the contract
        daiToken.transferFrom(msg.sender, address(this), amount);

        // Emit Deposit event for transparency
        emit Deposit(msg.sender, cricketerId, amount);
    }

    // Function for users to withdraw DAI from a specific cricketer
    function withdraw(uint256 cricketerId, uint256 amount) external {
        require(amount > 0, "Amount must be greater than 0");

        // Transfer DAI from the contract to the user
        daiToken.transfer(msg.sender, amount);

        // Emit Withdrawal event for transparency
        emit Withdrawal(msg.sender, cricketerId, amount);
    }

    // Function to get the total contract balance of DAI
    function getContractBalance() external view returns (uint256) {
        return daiToken.balanceOf(address(this));
    }

    // Function to get the balance of a specific user for a specific cricketer
    function getUserBalance(
        uint256 cricketerId
    ) external view returns (uint256) {
        return cricketerUserBalances[cricketerId][msg.sender];
    }

    // Function to get the total amount deposited by a user for a specific cricketer
    function getAmountDeposited(
        uint256 cricketerId
    ) external view returns (uint256) {
        return cricketerUserBalances[cricketerId][msg.sender];
    }

    // Function for the owner to add a new cricketer with a name and an initial score
    function addCricketer(
        uint256 cricketerId,
        string memory name,
        uint256 score
    ) external onlyOwner {
        require(
            bytes(cricketerNames[cricketerId]).length == 0,
            "Cricketer already exists"
        );

        // Update the cricketer's name and score
        cricketerNames[cricketerId] = name;
        cricketerScores[cricketerId] = score;

        // Emit AddCricketer event for transparency
        emit AddCricketer(cricketerId, name, score);
    }

    // Function to get the invested amount for a specific user and cricketer
    function getInvestedAmount(
        address investor,
        uint256 cricketerId
    ) external view returns (uint256) {
        return cricketerUserBalances[cricketerId][investor];
    }
}