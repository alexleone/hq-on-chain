pragma solidity ^0.4.17;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/GameSolo.sol";

contract TestGameSolo{

    GameSolo game = GameSolo(DeployedAddresses.GameSolo());
    string listQuestions = "Q1;Q2;Q3;";
    string listHashedAnswers = "A1;A2;A3;";
    uint256 entryFee = 1;
    string playerName = "Satoshi";

    address gameAddress;
    address expectedOwner = 0x8B618f31Baf048A32aEb9DbeF0112343D556490D;

  function testNewGame(){
    game.newGame(entryFee, listQuestions, listHashedAnswers);
    Assert.equal(game.arrayQuestions(0), "Q1", "questions were no set");
    Assert.equal(game.arrayHashedAnswers(0), "A1", "HashedAnswers were not set");
    Assert.equal(game.entryFee(), entryFee, "entryFee were not set");
  }

  //must run after testNewGame()
  function testGetGameOwner() {
      //Assert.equal(game.owner(), expectedOwner, "Game owner should be equal to this wallet address.");
    }

  function testRegistrationOpen(){
    Assert.isTrue(game.registrationOpen(),"Registration should be open");
  }

function register() payable {
      //game.register(playerName).value(entryFee);
}

  function testCanRegister(){
    //register();
    //Assert.equal(game.getPlayerName(0), playerName, "Player name should be equal to playerName");
  }

function estStartGame(){
  game.startGame();
  //Assert.isFalse(game.registrationOpen(),"Registration should close after startGame()");
}

}
