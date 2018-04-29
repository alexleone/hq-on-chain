import React, { Component, PropTypes } from 'react'
import getWeb3 from "../../util/web3/getWeb3";
import Game from './../../../build/contracts/Game.json'

class Register extends Component {
  constructor(props, context) {
    super(props, context);
    this.registerUser = this.registerUser.bind(this);
    this.Game = null;
    this.state = {
      userName: '',
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

  registerUser() {
    const tx = window.GameMethods.register(this.state.userName);
    const from = this.props.accounts[0];
    tx.send({
      from,
      gasLimit: 510000,
      value: 1000000
    }).then((response) => {
      location.href = `/play/${this.state.contractAddress}`;
    }).catch((error) => {
      console.error(error)
    })
  }

  render() {
    return (
      <main className="container">
        <h1 className='row text-center'>
          Register For Travia
        </h1>
        <form>
          <div className='form-group'>
            <label>Game Address</label>
            <input type='text'
                   className='form-control'
                   value={this.props.params.gameAddress}
                   readOnly>
            </input>
          </div>
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
          </div>
          <button type='button' className='btn btn-primary' onClick={this.registerUser}>Register</button>
        </form>

      </main>
    )
  }
}

Register.contextTypes = {
  drizzle: PropTypes.object,
};

export default Register
