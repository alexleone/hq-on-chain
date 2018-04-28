pragma solidity ^0.4.21;

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

using strings for *; //Arachnid library declaration

struct Player {
    string playerName;
    bool hasGuessed;
    bool isRegistered;
    string guess;
    address playerAddress;
    uint8 score;
    uint winnings;
}

struct Rounds {
    string question;
    string answer;
    bool roundStarted;
    bool roundComplete;
}

//bi-directional mapping, since solidity is not great with arrays
mapping(uint8 => Player) public players;
mapping(address => uint8) public getNumFromAddress;

//Game input data, set in constructor
string public listQuestions;
string public listHashedAnswers;
uint public entryFee;
address public owner;

string public currentAnswer;
string public currentQuestion;
uint public grandPrize;
uint8 public currentRound;
uint8 public numPlayers;
uint public numRounds;
bool public registrationOpen;
string public winnerName;

string[] public arrayQuestions;
string[] public arrayAnswers;
mapping(uint8 => Rounds) public rounds;

constructor(address _owner, uint _entryFee, string _listQuestions, string _listAnswers) public {
  owner = _owner;
  entryFee = _entryFee;
  listQuestions = _listQuestions;
  listHashedAnswers = _listAnswers;
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

/// Create a new game with $(_entryFee) (finney) registration fee
function newGame(uint _entryFeeInFinney) onlyOwner public {
    entryFee = _entryFeeInFinney * 1e15; //convert from finney to wei

    //reset round data
    currentRound = 0;
    registrationOpen = true;
    grandPrize = 0;
    numPlayers = 0;
    numRounds = 0;

    //reset registration (cannot delete a mapping, must delete each element)
    for (uint8 y = 0; y < numRounds; y++){delete players[y];}
}

/// Set the questions and answers
function setQuestions(string _questions, string _answers) onlyOwner public {
    arrayQuestions = convertStringToArray(_questions, ";");
    arrayAnswers = convertStringToArray(_answers, ";");

    numRounds = arrayQuestions.length-1;
    for (uint8 y = 0; y < numRounds; y++){
        rounds[y].question = arrayQuestions[y];
        rounds[y].answer = arrayAnswers[y];
        }
}

/// Register using your name and pay the entry fee
function register(string _playerName) payable public {
    //Check that registration is open
    assert(msg.value >= entryFee && registrationOpen);
    // The first player is player 0
    players[numPlayers].playerName = _playerName;
    players[numPlayers].playerAddress = msg.sender;
    players[numPlayers].isRegistered = true;

    // Create lookup of player's number using their address
    getNumFromAddress[msg.sender] = numPlayers;
    numPlayers++;

    // Return funds if the player overpayed
    uint overPayed = msg.value - entryFee;
    if (overPayed > 0) { msg.sender.transfer(overPayed); }
}

// Lookup a player's number using their address
function getPlayersFromAddress(address _addressplayer) view private returns (uint8){
    return getNumFromAddress[_addressplayer];
}

 /// Close registration calculate grand prize, and start the game
function startGame() onlyOwner public {
    registrationOpen = false;
    grandPrize = numPlayers * entryFee;
    startNewRound();
}

function startNewRound() onlyOwner private {
    rounds[currentRound].roundStarted = true;
    currentQuestion = rounds[currentRound].question;
    currentAnswer = "";
}

function forceNewRound() onlyOwner public {
    startNewRound();
}

/// Make your guesss for the current
function guess(string _guess) public {
    // Get the players number and require registration
    uint8 thisPlayer = getPlayersFromAddress(msg.sender);
    assert(players[thisPlayer].isRegistered);

    // Ensure the player has not guessed twice,
    // and that someone has not already won this round
    assert(players[thisPlayer].hasGuessed == false);
    assert(rounds[currentRound].roundComplete == false);
    assert(rounds[currentRound].roundStarted == true);
    players[thisPlayer].guess = _guess;
    players[thisPlayer].hasGuessed = true;

    // Add points to winner and reveal the correct answer
    // !WEAKNESS: users could theoretically check answers by checking gas estimates
    if (keccak256(players[thisPlayer].guess) == keccak256(rounds[currentRound].answer)) {
        players[thisPlayer].score++;
        endRound();
    }
}

function endRound() private {
    rounds[currentRound].roundComplete = true;
    // Reveal the answer by assigning it to a public variable
    currentAnswer = rounds[currentRound].answer;
    //note to dev: Check that the last player will be reset
    for (uint8 y = 0; y < numPlayers; y++) {
        players[y].hasGuessed = false;
        players[y].guess = "";
    }
    currentRound++; // Iterate to the next round
    if (currentRound >= numRounds) { endGame(); } //End the game if necessary
}

// Calculates the winner and assigns the grand prize
function endGame() onlyOwner public {
    uint8 winningScore = 0;
    for (uint8 y = 0; y < numPlayers; y++) {
        if (players[y].score > winningScore) {
            winningScore = players[y].score;
            uint8 winnerNum = y;
        }
    }
    winnerName = players[winnerNum].playerName;
    players[winnerNum].winnings = grandPrize;
}

// Requires the winner to withdraw their prize, see why here:
// https://blog.ethereum.org/2016/06/10/smart-contract-security/
function withdrawWinnings() public {
    uint8 thisPlayer = getPlayersFromAddress(msg.sender);
    uint winningSum = players[thisPlayer].winnings;
    assert(winningSum > 0);
    players[thisPlayer].winnings = 0;
    msg.sender.transfer(winningSum);
}

// Return all funds to owner if things go wrong
function reset() public onlyOwner {
    owner.transfer(this.balance);
}

}
