pragma solidity ^0.4.21;

import './strings.sol';
import './Game.sol';

contract GameFactory {

//TO-DO: Checks equal number questions answers

address[] public contracts;
address public owner = msg.sender;

  event GameCreated(
    address gameAddress
  );

  function createGame(
    uint entryFee,
    string listQuestions,
    string listHashedAnswers
    )
    public
    returns(address newContract)
    {

    Game g = new Game(msg.sender, entryFee, listQuestions, listHashedAnswers);
    contracts.push(g);

    emit GameCreated(address(g));

    return g;
  }
}
