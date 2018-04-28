pragma solidity ^0.4.8;

import './strings.sol';

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

struct Player {
    string playerName;
    bool hasGuessed;
    bool isRegistered;
    string guess;
    address playerAddress;
    uint8 score;
    uint winnings;
}

mapping(uint8 => Player) public players;
//mapping(address => answer) public string;

uint public entryFee;
string public listQuestions;
string public listAnswers;

constructor(address _owner, uint _entryFee, string _listQuestions, string _listAnswers) public {
  owner = _owner;
  entryFee = _entryFee;
  listQuestions = _listQuestions;
  listAnswers = _listAnswers;
}

modifier onlyOwner() {
    require(msg.sender == owner);
    _;
}

function convertStringToArray(string inputString, string deliminator) private returns(string[] parts){
    var s = inputString.toSlice();
    var delim = deliminator.toSlice();
    parts = new string[](s.count(delim) + 1);
    for(uint i = 0; i < parts.length; i++) {
        parts[i] = s.split(delim).toString();
    }
}

function stringTest(string testString) public returns (string[] parts){
  
}


}
