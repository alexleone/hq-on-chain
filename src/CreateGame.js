import React, { Component } from 'react';
import bindAll from 'lodash/bindAll';
import getWeb3 from './util/web3/getWeb3';
import GameFactory from './../build/contracts/GameFactory.json'

class CreateGame extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gameName: '',
      questionOne: '',
      questionTwo: '',
      questionThree: '',
      answerOne: '',
      answerTwo: '',
      answerThree: '',
    };
    // console.log(context)
    bindAll(this, ['createGame']);
  }

  createGame (event) {
    event.preventDefault()

    const questions = [
      this.state.questionOne,
      this.state.questionTwo,
      this.state.questionThree,
    ];

    const answers = [
      this.state.answerOne,
      this.state.answerTwo,
      this.state.answerThree,
    ];

    getWeb3
      .then((result) => {

        const web3 = result.payload.web3Instance;

        // TODO: change this to the real contract
        const contractAddress = '0xb1dc82cee7d4d41429be0feea8566a3206d029f3';
        const entryFee = 23;

        const factory = new web3.eth.Contract(
          GameFactory.abi,
          contractAddress
        );

        const tx = factory.methods.createGame(
          entryFee,
          questions.join(';') + ';',
          answers.join(';') + ';'
        );

        return tx.send({
          from: this.props.accounts[0],
          gasLimit: 5000000
        });
      })
      .then((result) => {
        // TODO: this is the game address
        const gameEvent = result.events.GameCreated;
        window.gameAddress = gameEvent.returnValues.gameAddress;
      })
      .catch((err) => console.error(err));
  }

  render() {
    return (
      <div className='container game-all'>
        <h1 className='row text-center'>
          Create New Game
        </h1>
        <form onSubmit={this.createGame.bind(this)}>

          <div className='form-group'>
            <label>Name</label>
            <input type='text'
                   className='form-control'
                   placeholder='Game Name'
                   value={this.state.gameName}
                   onChange={(e) => {
                     e.preventDefault();
                     this.setState({gameName: e.target.value});
                   }}>
            </input>
          </div>

          <div className='form-group'>
            <h2>Add Triva Questions</h2>
          </div>

          <div className='form-group'>
            <h3>Question One</h3>
          </div>

          <div className='form-group'>
            <label>Question</label>
            <input type='text'
                   className='form-control'
                   placeholder='Question'
                   value={this.state.questionOne}
                   onChange={(e) => {
                     e.preventDefault();
                     this.setState({questionOne: e.target.value});
                   }}>
            </input>
          </div>
          <div className='form-group'>
            <label>Answer</label>
            <input type='text'
                   className='form-control'
                   placeholder='Answer'
                   value={this.state.answerOne}
                   onChange={(e) => {
                     e.preventDefault();
                     this.setState({answerOne: e.target.value});
                   }}>
            </input>
          </div>

          <div className='form-group'>
            <h3>Question Two</h3>
          </div>

          <div className='form-group'>
            <label>Question</label>
            <input type='text'
                   className='form-control'
                   placeholder='Question'
                   value={this.state.questionTwo}
                   onChange={(e) => {
                     e.preventDefault();
                     this.setState({questionTwo: e.target.value});
                   }}>
            </input>
          </div>
          <div className='form-group'>
            <label>Answer</label>
            <input type='text'
                   className='form-control'
                   placeholder='Answer'
                   value={this.state.answerTwo}
                   onChange={(e) => {
                     e.preventDefault();
                     this.setState({answerTwo: e.target.value});
                   }}>
            </input>
          </div>

          <div className='form-group'>
            <h3>Question Three</h3>
          </div>

          <div className='form-group'>
            <label>Question</label>
            <input type='text'
                   className='form-control'
                   placeholder='Question'
                   value={this.state.questionThree}
                   onChange={(e) => {
                     e.preventDefault();
                     this.setState({questionThree: e.target.value});
                   }}>
            </input>
          </div>
          <div className='form-group'>
            <label>Answer</label>
            <input type='text'
                   className='form-control'
                   placeholder='Answer'
                   value={this.state.answerThree}
                   onChange={(e) => {
                     e.preventDefault();
                     this.setState({answerThree: e.target.value});
                   }}>
            </input>
          </div>

          <button type='sumbit'
                  className='btn btn-primary btn-lg btn-block'>
            Finish!
          </button>

        </form>
      </div>
    );
  }
}

export default CreateGame
