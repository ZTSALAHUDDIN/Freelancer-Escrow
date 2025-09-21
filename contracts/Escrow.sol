// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract Escrow {
    address public client;
    address public freelancer;
    bool public isFunded;

    // Events to track actions
    event Deposited(address indexed client, uint amount);
    event Released(address indexed freelancer, uint amount);
    event Refunded(address indexed client, uint amount);

    constructor(address _freelancer) payable {
        require(_freelancer != address(0), "Freelancer address cannot be zero");
        client = msg.sender;
        freelancer = _freelancer;
        isFunded = false;
    }

    // Deposit funds from client
    function deposit() public payable {
        require(msg.sender == client, "Only client can deposit");
        require(!isFunded, "Already funded");
        require(msg.value > 0, "Deposit must be greater than 0");

        isFunded = true;

        emit Deposited(client, msg.value);
    }

    // Release funds to freelancer
    function release() public {
        require(msg.sender == client, "Only client can release funds");
        require(isFunded, "No funds to release");

        uint contractBal = address(this).balance;
        require(contractBal > 0, "Contract balance is zero");

        (bool sent, ) = freelancer.call{value: contractBal}("");
        require(sent, "Failed to send funds to freelancer");

        isFunded = false;

        emit Released(freelancer, contractBal);
    }

    // Refund funds to client
    function refund() public {
        require(msg.sender == freelancer, "Only freelancer can request refund");
        require(isFunded, "No funds to refund");

        uint contractBal = address(this).balance;
        require(contractBal > 0, "Contract balance is zero");

        (bool sent, ) = client.call{value: contractBal}("");
        require(sent, "Failed to refund client");

        isFunded = false;

        emit Refunded(client, contractBal);
    }

    // Helper: get contract balance
    function contractBalance() public view returns (uint) {
        return address(this).balance;
    }
}