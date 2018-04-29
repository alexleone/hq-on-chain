pragma solidity ^0.4.17;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/GameSolo.sol";

contract TestGameFactory{
//  GameFactory factory = GameFactory(DeployedAddresses.GameFactory());
  // Testing the adopt() function
    GameFactory factory = GameFactory(DeployedAddresses.GameFactory());
    Game game;
    string listQuestions = "Q1;Q2;Q3;";
    string listHashedAnswers = "A1;A2;A3;";
    uint256 entryFee = 1;
    string playerName = "Satoshi";

    address gameAddress;
    address expectedOwner = 0x8B618f31Baf048A32aEb9DbeF0112343D556490D;

  function testGetFactoryOwner() {
      Assert.equal(factory.owner(), expectedOwner, "GameFactory owner should be equal to the address who deployed.");
  }

  function testCreateGame(){
    factory.createGame(entryFee, listQuestions, listHashedAnswers);
    gameAddress = factory.contracts(0);
    Assert.isNotZero(gameAddress,"createGame() should deploy a new contract");
  }

  function testGetGameOwner() {
      game = Game(gameAddress);
      Assert.equal(game.owner(), this, "Game owner should be equal to this wallet address.");
    }

  function testGameDataConstructed(){
    Assert.equal(game.listQuestions(), listQuestions, "listQuestions were not trasnferred from factory");
    Assert.equal(game.listHashedAnswers(), listHashedAnswers, "listHashedAnswers were not trasnferred from factory");
    Assert.equal(game.entryFee(), entryFee, "entryFee were not trasnferred from factory");
  }

  function testRegistrationOpen(){
      game = Game(gameAddress);
    Assert.isTrue(game.registrationOpen(),"Registration should be open");
  }

function register(){
      game.register.value(entryFee)(playerName);
}

  function testCanRegister(){
    register();
    Assert.equal(game.getPlayerName(0), playerName, "Player name should be equal to playerName");
  }

function testStartGame(){
  game.startGame();
  Assert.isFalse(game.registrationOpen,"Registration should close after startGame()");
  event.log(game.grandPrize);

}

}
