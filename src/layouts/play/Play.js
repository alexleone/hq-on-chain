import React, { Component, PropTypes } from 'react'
import getWeb3 from "../../util/web3/getWeb3";
import Game from './../../../build/contracts/Game.json'

class Play extends Component {
  constructor(props, context) {
    super(props, context);
    this.submitAnswer = this.submitAnswer.bind(this);
    this.getCurrentQuestion = this.getCurrentQuestion.bind(this);
    this.getCurrentRound = this.getCurrentRound.bind(this);
    this.getGameEnded = this.getGameEnded.bind(this);
    this.getWinnerName = this.getWinnerName.bind(this);
    this.withdrawWinnings = this.withdrawWinnings.bind(this);
    window.accountAddress = '';
    this.state = {
      contractAddress: this.props.params.gameAddress,
      currentQuestion: '',
      currentRound: '',
      currentAnswer: '',
      gameEnded: false,
      winnerName: ''
    }
  }

  getGameEnded() {
    const tx = window.GameMethods.gameEnded();
    const from = this.props.accounts[0];
    tx.call({
      from,
    }).then((gameEnded) => {
      this.setState({ gameEnded });
    }).catch((error) => {
      console.error(error)
    })
  }

  getCurrentQuestion() {
    const tx = window.GameMethods.currentQuestion();
    const from = this.props.accounts[0];
    tx.call({
      from,
    }).then((currentQuestion) => {
      this.setState({ currentQuestion });
    }).catch((error) => {
      console.error(error)
    })
  }

  getCurrentRound() {
    const tx = window.GameMethods.currentRound();
    const from = this.props.accounts[0];
    tx.call({
      from,
    }).then((currentRound) => {
      this.setState({ currentRound });
    }).catch((error) => {
      console.error(error)
    })
  }

  getWinnerName() {
    debugger
    const tx = window.GameMethods.winnerName();
    const from = this.props.accounts[0];
    tx.call({
      from,
    }).then((winnerName) => {
      this.setState({ winnerName });
    }).catch((error) => {
      console.error(error)
    })
  }

  submitAnswer(e) {
    e.preventDefault();
    const tx = window.GameMethods.guess(this.state.currentAnswer);
    const from = this.props.accounts[0];
    tx.send({
      from,
      gasLimit: 1000000,
      // value: 1000000
    }).then((response) => {
      this.setState({
        currentAnswer: ''
      });
      this.getCurrentRound();
      this.getCurrentQuestion();
      this.getGameEnded();
      this.getWinnerName();
    }).catch((error) => {
      console.error(error)
    })
  }

  withdrawWinnings(e) {
    e.preventDefault();
    debugger
    const tx = window.GameMethods.withdrawWinnings();
    const from = this.props.accounts[0];
    tx.send({
      from,
      gasLimit: 1000000,
    }).then((response) => {
      alert('You are the winner! Don\'t Spend it all in one place!!');
    }).catch((error) => {
      console.error(error)
    })
  }


  componentDidMount() {
    const contractAddress = this.props.params.gameAddress;
    getWeb3
      .then((result) => {
        const web3 = result.payload.web3Instance;
        // TODO: change this to the real contract
        window.Game = new web3.eth.Contract(
          Game.abi,
          contractAddress
        );
        window.GameMethods = window.Game.methods;
        this.getCurrentQuestion();
        this.getCurrentRound();
        this.getGameEnded();
        this.getWinnerName();
      })
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.error(err)
      });
  }

  render() {
    if (this.state.gameEnded) {
      return <div>
        <h1>Game Ended</h1>
        <h2> Winner Name: {this.state.winnerName}</h2>
        <button onClick={this.withdrawWinnings}> Claim Winnings!!!!! </button>
      </div>
    }
    return (
      <main className="container">
        <div className='form-group'>
          <h1>Play the Game</h1>
          <form>
            <h2>Current Round: {this.state.currentQuestion === ''  ? 'Game Not Started' : (parseInt(this.state.currentRound) + 1)}</h2>
            <h2>Current Question:</h2>
            <h3>{this.state.currentQuestion}</h3>
            <div className='form-group'>
              <label>Answer to the question</label>
              <input type='text'
                     className='form-control'
                     placeholder='Guess...'
                     value={this.state.currentAnswer}
                     onChange={(e) => {
                       e.preventDefault();
                       this.setState({ currentAnswer: e.target.value });
                     }}>
              </input>
            </div>
          </form>
          <div className="btn-group" role="group">
            <button className="btn btn-default"
                    type="button"
                    onClick={this.submitAnswer}>
              Submit Answer
            </button>
          </div>
        </div>
      </main>
    )
  }
}

Play.contextTypes = {
  drizzle: PropTypes.object,
};

export default Play
