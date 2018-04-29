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
    // console.log(state);

  }


  render() {
    if (this.props.drizzleStatus.initialized) {
      const myContext = this.context;
      // this.context.drizzle.contracts.GameFactory.methods.owner().call().then(function () {
      //   debugger
      // }).catch(function () {
      //   debugger
      // });
      // const some = this.contracts.GameFactory.methods.entryFee.data();
      // debugger;
    }
    return (
      <main className="container">
        <div className="pure-g">
          <div className="pure-u-1-1 header">
            <img src={logo} alt="drizzle-logo" />
            <h1>Drizzle Examples</h1>
            <p>Examples of how to get started with Drizzle in various situations.</p>

            <br/><br/>
          </div>

          <div className="pure-u-1-1">
            <h2>Active Account</h2>
            <AccountData accountIndex="0" units="ether" precision="3" />

            <br/><br/>

            <ContractData contract="GameFactory" method="owner" />
            {/*<ContractData contract="GameFactory" method="contracts" methodArgs={[1]}/>*/}
            {/*uint entryFee,*/}
            {/*string listQuestions,*/}
            {/*string listHashedAnswers*/}
            <ContractForm contract="GameFactory" method="createGame" labels={['Entry Fee', 'Questions List', 'Answers List']}/>
            <ContractData contract="Game" method="entryFee" />
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
