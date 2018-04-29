import React, { Component, PropTypes } from 'react'
import { AccountData, ContractData, ContractForm } from 'drizzle-react-components'
import getWeb3 from "../../util/web3/getWeb3";
import Game from './../../../build/contracts/Game.json'

class Register extends Component {
  constructor(props, context) {
    super(props, context);
    this.Game = null;
    this.state = {
      currentGuess: '',
      currentQuestion: '',
      userName: ''
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

  registerUser = () => {
    const tx = window.GameMethods.register(this.state.userName);
    tx.send({
      from: '0xEB451C6F3c6B137E73B53800711Ad037F056309e',
      gasLimit: 510000,
      value: 1000000
    }).then((response) => {
      debugger
      console.log(response)
    }).catch((error) => {
      console.error(error)
    })
  };

  render() {
    return (
      <main className="container">

        <div className='form-group'>
          <label>User Name</label>
          <input type='text'
                 className='form-control'
                 placeholder='User Name'
                 value={this.state.userName}
                 onChange={(e) => {
                   e.preventDefault();
                   this.setState({ userName: e.target.value });
                 }}>
          </input>
          <button onClick={this.registerUser}>Register for Trivia</button>
        </div>
      </main>
    )
  }
}

Register.contextTypes = {
  drizzle: PropTypes.object,
};

export default Register
