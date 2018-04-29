import React, { Component } from 'react';
import bindAll from 'lodash/bindAll';
import getWeb3 from './util/web3/getWeb3';
import Game from './../build/contracts/Game.json'

class ManageGame extends Component {
  constructor(props) {
    super(props);
    debugger
    this.state = {
      gameAddress: this.props.params.gameAddress
    };

    bindAll(this, ['startGame', 'endRound']);
  }

  startGame () {
    getWeb3
      .then((result) => {
        const web3 = result.payload.web3Instance;
        const game = new web3.eth.Contract(
          Game.abi,
          this.state.gameAddress
        );

        const tx = game.methods.startGame();

        return tx.send({
          from: this.props.accounts[0],
          gasLimit: 5000000
        });
      })
      .then(() => {
        alert('The game is started.');
      })
      .catch((err) => console.error(err));
  }

  endRound () {
    getWeb3
      .then((result) => {
        const web3 = result.payload.web3Instance;
        const game = new web3.eth.Contract(
          Game.abi,
          this.state.gameAddress
        );

        const tx = game.methods.endRound();

        return tx.send({
          from: this.props.accounts[0],
          gasLimit: 5000000
        });
      })
      .then(() => {
        alert('The current round is ended.');
      })
      .catch((err) => console.error(err));
  }

  render() {
    return (
      <div className='container'>
        <h1 className='row text-center'>
          Manage A Game
        </h1>

        <form>
          <div className='form-group'>
            <label>Game Address</label>
            <input type='text'
                   className='form-control'
                   placeholder='Game Address'
                   value={this.state.gameAddress}
                   onChange={(e) => {
                     e.preventDefault();
                     this.setState({gameAddress: e.target.value});
                   }}>
            </input>
          </div>
        </form>

        <div className="btn-group" role="group">
          <button className="btn btn-default"
                  type="button"
                  onClick={this.startGame.bind(this)}>
            Start Game
          </button>
          <button className="btn btn-default"
                  type="button"
                  onClick={this.endRound.bind(this)}>
            End Round
          </button>
        </div>
      </div>
    );
  }
}

export default ManageGame
