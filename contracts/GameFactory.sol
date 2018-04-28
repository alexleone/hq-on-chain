pragma solidity ^0.4.8;

contract GameFactory{

//TO-DO: Checks equal number questions answers

address[] public contracts;

function createGame(
  uint entryFee,
  string listQuestions,
  string listAnswers
  )
  public
  returns(address newContract)
  {
  Game g = new Game(msg.sender, entryFee, listQuestions, listAnswers);
  contracts.push(g);
  return g;
  }
}

contract Game{

address public owner;

uint public entryFee;
string public listQuestions;
string public listAnswers;

constructor(address _owner, uint _entryFee, string _listQuestions, string _listAnswers) public {
  owner = _owner;
  entryFee = _entryFee;
  listQuestions = _listQuestions;
  listAnswers = _listAnswers;
}

}
