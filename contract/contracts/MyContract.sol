pragma solidity ^0.8.13;

contract MyContract {
    uint number = 0;

    function addNumber() public{
        number += 1;
    }

    function getNumber() public view returns(uint) {
        return number;
    }
}