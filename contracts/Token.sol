pragma solidity ^0.7.0;

import "hardhat/console.sol";

contract Token {
    string public name = "My cool token";
    string public symbol = "MCT";

    uint256 public totalSupply = 1000;

address public owner;
    mapping(address => uint256) balances;

    constructor() {
        balances[msg.sender] = totalSupply;
        owner = msg.sender;
    }

    function getTotalSupply() external view returns (uint256) {
        return totalSupply;
    }

    function transfer(address to, uint amount) external {
        require(balances[msg.sender] >= amount, "Not enough tokens!!!");

        balances[msg.sender] -= amount;
        balances[to] += amount;
    }

    function balanceOf(address account) external view returns (uint256) {
        return balances[account];
    }
}
