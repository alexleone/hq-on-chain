pragma solidity ^0.4.17;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/Game.sol";

contract TestAdoption {
  Game game = Adoption(DeployedAddresses.Game());
  // Testing the adopt() function
  function testStartGame() public {
    game.startGame();
    Assert.equal(returnedId, expected, "Adoption of pet ID 8 should be recorded.");
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
}
