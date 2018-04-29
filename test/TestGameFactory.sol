pragma solidity ^0.4.17;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/GameFactory.sol";

contract TestGameFactory {
//  GameFactory factory = GameFactory(DeployedAddresses.GameFactory());
  // Testing the adopt() function
  function testCreateGame(){
    GameFactory factory = GameFactory(DeployedAddresses.GameFactory());
    factory.createGame(1,"Q1;Q2;Q3;","A1;A2;A3;");
    address gameAddress = factory.contracts(0);
    Assert.isNotZero(gameAddress,"createGame() should deploy a new contract");
  }

  function testGetContractOwner() {
    GameFactory factory = GameFactory(DeployedAddresses.GameFactory());
    address expected = this;
    Assert.equal(factory.owner(), expected, "GameFactory owner should be equal to this wallet address.");
  }
}
  // Testing retrieval of a single pet's owner
  // function testGetAdopterAddressByPetId() public {
  //   // Expected owner is this contract
  //   address expected = this;

  //   address adopter = adoption.adopters(8);

  //   Assert.equal(adopter, expected, "Owner of pet ID 8 should be recorded.");
  // }
  // // Testing retrieval of all pet owners
  // function testGetAdopterAddressByPetIdInArray() public {
  //   // Expected owner is this contract
  //   address expected = this;

  //   // Store adopters in memory rather than contract's storage
  //   address[16] memory adopters = adoption.getAdopters();

  //   Assert.equal(adopters[8], expected, "Owner of pet ID 8 should be recorded.");
  // }
