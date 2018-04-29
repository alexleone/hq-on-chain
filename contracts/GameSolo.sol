pragma solidity ^0.4.21;

import './strings.sol';

contract GameSolo{

    using strings for *; //Arachnid library declaration

    struct Rounds {
        string question;
        string answer;
        bool roundStarted;
        bool roundComplete;
    }

    struct Player {
        string playerName;
        bool hasGuessed;
        bool isRegistered;
        string guess;
        address playerAddress;
        uint8 score;
        uint winnings;
    }

    //bi-directional mapping, since solidity is not great with arrays
    mapping(uint8 => Player) public players;
    mapping(address => uint8) public getNumFromAddress;

    address public owner;

    uint public entryFee; //units of wei
    //!!!!Make Private
    string public listQuestions;
    string public listHashedAnswers;

    string public currentQuestion;
    uint public grandPrize;
    uint8 public currentRound = 0;
    uint8 public numPlayers;
    uint public numRounds;
    bool public registrationOpen = true;
    string public winnerName;
    bool public gameEnded;

    //Make private before deploying
    string[] public arrayQuestions;
    string[] public arrayHashedAnswers;
    mapping(uint8 => Rounds) public rounds;

    modifier onlyOwner() {
        require(msg.sender == owner);  _; }

    function newGame(uint _entryFee, string _listQuestions, string _listHashedAnswers) public {
      owner = msg.sender;
      entryFee = _entryFee;
      setQuestions(_listQuestions, _listHashedAnswers);
    }

    function getPlayerName(uint8 playerID) public view returns(string){ //bool, bool, string, address, uint8, uint){
      return(players[playerID].playerName);
    }

    // Lookup a player's number using their address
    function getPlayersFromAddress(address _addressplayer) view private returns (uint8){
        return getNumFromAddress[_addressplayer];
    }

    /// Set the questions and answers
    function setQuestions(string _questions, string _answers) onlyOwner public {
        arrayQuestions = convertStringToArray(_questions, ";");
        arrayHashedAnswers = convertStringToArray(_answers, ";");
        numRounds = arrayQuestions.length-1;
        for (uint8 y = 0; y < numRounds; y++){
            rounds[y].question = arrayQuestions[y];
            }
    }

    function convertStringToArray(string inputString, string deliminator) private returns(string[] parts){
        var s = inputString.toSlice();
        var delim = deliminator.toSlice();
        parts = new string[](s.count(delim) + 1);
        for(uint i = 0; i < parts.length; i++) {
            parts[i] = s.split(delim).toString();
        }
    }

    /// Register using your name and pay the entry fee
    function register(string _playerName) payable public {
        //Check that registration is open
        //assert(msg.value >= entryFee && registrationOpen);
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

     /// Close registration calculate grand prize, and start the game
    function startGame() onlyOwner public returns(bool) {
        registrationOpen = false;
        grandPrize = numPlayers * entryFee;
        setQuestions(listQuestions, listHashedAnswers);
        startNewRound();
        return true;
    }

    function startNewRound() onlyOwner public {
        rounds[currentRound].roundStarted = true;
        currentQuestion = rounds[currentRound].question;
    }

    //debugging function- can remove
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
        if (keccak256(players[thisPlayer].guess) == keccak256(rounds[currentRound].answer)) {
            players[thisPlayer].score++;
        }
    }

    function endRound() public onlyOwner {
        rounds[currentRound].roundComplete = true;
        for (uint8 y = 0; y < numPlayers; y++) {
            players[y].hasGuessed = false;
            players[y].guess = "";
        }
        currentRound++; // Iterate to the next round
        if (currentRound >= numRounds) { endGame(); } //End the game if necessary
    }

    // Calculates the winner and assigns the grand prize
    //note: redundant with endRound()
    function endGame() onlyOwner public {
        gameEnded = true;
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
        assert(winningSum > 0); //throws exceptions for non-winners
        players[thisPlayer].winnings = 0; //resets the winnings to 0 (just to be safe?)
        msg.sender.transfer(winningSum);
    }

    // Return all funds to owner if things go wrong
    function reset() public onlyOwner {
        owner.transfer(this.balance);
    }
}
