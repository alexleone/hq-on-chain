import React, { Component, PropTypes } from 'react'
import { AccountData, ContractData, ContractForm } from 'drizzle-react-components'
import logo from '../../logo.png'

class Home extends Component {
  constructor(props, context) {
    super(props, context);
    // debugger
    // var state = context.drizzle.store.getState();
    console.log('props');
    console.log(props);

    console.log('context');
    console.log(context);

    console.log('state');
    this.state = {
      Game: null,
      GameInstance: null
    }

  }
  componentDidMount() {
    // let self = this;
    if (this.props.drizzleStatus.initialized) {
      // this.state.Game = TruffleContract(Game);
      // this.context.drizzle.contracts.GameFactory.methods.createGame(.01, 'one,two', 'one,two').send({from: '0x40DfCadf20e196E1115c978A3d114Fb39eC2fF4C'}).then((gameAddress) => {
      //   self.state.Game.setProvider({ provider: this.context.drizzle.web3, address: gameAddress, network_id: 5777 });
      //   debugger
      //   self.state.Game.deployed().then(function (instance) {
      //     self.state.GameInstance = instance;
      //     debugger
      //     return self.state.GameInstance.gameEnded.call();
      //   }).then(function (response) {
      //     debugger
      //   }).catch(function (err) {
      //     debugger
      //     console.log(err.message);
      //   });
      // }).catch(() => {
      //   debugger
      // });
    }
  }

  render() {

    //   "4b3055de": "arrayHashedAnswers(uint256)",
    //   "eb314eb1": "arrayQuestions(uint256)",
    //   "e7dea022": "currentQuestion()",
    //   "8a19c8bc": "currentRound()",
    //   "6cbc2ded": "endGame()",
    //   "749aa2d9": "endRound()",
    //   "072ea61c": "entryFee()",
    //   "e4fc0d7f": "forceNewRound()",
    //   "2f6fe396": "gameEnded()",
    //   "56f58538": "getNumFromAddress(address)",
    //   "b8ef455c": "getPlayerName(uint8)",
    //   "ce76c5ca": "grandPrize()",
    //   "4eee59b3": "guess(string)",
    //   "eac046b0": "listHashedAnswers()",
    //   "2503059e": "listQuestions()",
    //   "44ccca51": "newGame(address,uint256,string,string)",
    //   "97b2f556": "numPlayers()",
    //   "9d78325d": "numRounds()",
    //   "8da5cb5b": "owner()",
    //   "af155a44": "players(uint8)",
    //   "f2c298be": "register(string)",
    //   "736f88cd": "registrationOpen()",
    //   "d826f88f": "reset()",
    //   "5d7984d3": "rounds(uint8)",
    //   "9140bd71": "setQuestions(string,string)",
    //   "d65ab5f2": "startGame()",
    //   "bd85948c": "startNewRound()",
    //   "e2ba53f0": "winnerName()",
    //   "cc42e83a": "withdrawWinnings()"

    return (
      <main className="container">
        <div className="pure-g">
          <div className="pure-u-1-1 header">
            <img src={logo} alt="drizzle-logo"/>
            <h1>Drizzle Examples</h1>
            <p>Examples of how to get started with Drizzle in various situations.</p>

            <br/><br/>
          </div>

          <div className="pure-u-1-1">
            <h2>Active Account</h2>
            <AccountData accountIndex="0" units="ether" precision="3"/>

            <br/><br/>
            Game Owner:
            <ContractData contract="GameSolo" method="owner"/>
            <br/>

            Game Create:
            <ContractForm contract="GameSolo" method="newGame" labels={['Entry Fee', 'Questions List', 'Answers List']}/>
            <br/>

            Start Game:
            <ContractForm contract="GameSolo" method="startGame" />
            <br/>

            entryFee:
            <ContractData contract="GameSolo" method="entryFee" />
            <br/>
            listQuestions:
            <ContractData contract="GameSolo" method="listQuestions" />
            <br/>
            listHashedAnswers:
            <ContractData contract="GameSolo" method="listHashedAnswers" />
            <br/>
            currentQuestion:
            <ContractData contract="GameSolo" method="currentQuestion" />
            <br/>
            grandPrize:
            <ContractData contract="GameSolo" method="grandPrize" />
            <br/>
            registrationOpen:
            <ContractData contract="GameSolo" method="registrationOpen" />
            <br/>
            winnerName:
            <ContractData contract="GameSolo" method="winnerName" />
            <br/>
            gameEnded:
            <ContractData contract="GameSolo" method="gameEnded" />
            <br/>
            current round:
            <ContractData contract="GameSolo" method="currentRound" />
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            register user:
            <ContractForm contract="GameSolo" method="register"/>
            <br/>

            {/*<ContractData contract="GameSolo" method="arrayQuestions" />*/}
            <br/>
            {/*<ContractData contract="GameSolo" method="arrayHashedAnswers" />*/}
            <br/>
          </div>
        </div>
      </main>
    )
  }
}

Home.contextTypes = {
  drizzle: PropTypes.object,
};

export default Home
