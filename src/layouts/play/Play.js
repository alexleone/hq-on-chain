import React, { Component, PropTypes } from 'react'
import getWeb3 from "../../util/web3/getWeb3";
import Game from './../../../build/contracts/Game.json'

class Play extends Component {
  constructor(props, context) {
    super(props, context);
    this.Game = null;
    this.state = {
      userName: '',
      registered: false,
      contractAddress: this.props.params.gameAddress
    }
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
      })
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.error(err)
      });
  }

  render() {
    return (
      <main className="container">
        <div className='form-group'>
          <h1>Play the Game</h1>

        </div>
      </main>
    )
  }
}

Play.contextTypes = {
  drizzle: PropTypes.object,
};

export default Play
