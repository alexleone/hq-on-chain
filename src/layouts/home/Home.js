import React, { Component } from 'react'
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

    // this.contracts = context.drizzle.contracts
    // // If Drizzle is initialized (and therefore web3, accounts and contracts), fetch data.
    // // This will update automatically when the contract state is altered.
    // var storedData = this.props.drizzleStatus.initialized ? this.contracts.GameFactory.methods.entryFee.data() : 'Loading...'
    // console.log(storedData);
  }


  render() {
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

            <ContractForm contract="GameFactory" method="entryFee" />
          </div>


          {/*<div className="pure-u-1-1">*/}
            {/*<h2>TutorialToken</h2>*/}
            {/*<p>Here we have a form with custom, friendly labels. Also note the token symbol will not display a loading indicator. We've suppressed it with the <code>hideIndicator</code> prop because we know this variable is constant.</p>*/}
            {/*<p><strong>Total Supply</strong>: <ContractData contract="TutorialToken" method="totalSupply" methodArgs={[{from: this.props.accounts[0]}]} /> <ContractData contract="TutorialToken" method="symbol" hideIndicator /></p>*/}
            {/*<p><strong>My Balance</strong>: <ContractData contract="TutorialToken" method="balanceOf" methodArgs={[this.props.accounts[0]]} /></p>*/}
            {/*<h3>Send Tokens</h3>*/}
            {/*<ContractForm contract="TutorialToken" method="transfer" labels={['To Address', 'Amount to Send']} />*/}

            {/*<br/><br/>*/}
          {/*</div>*/}

          {/*<div className="pure-u-1-1">*/}
            {/*<h2>ComplexStorage</h2>*/}
            {/*<p>Finally this contract shows data types with additional considerations. Note in the code the strings below are converted from bytes to UTF-8 strings and the device data struct is iterated as a list.</p>*/}
            {/*<p><strong>String 1</strong>: <ContractData contract="ComplexStorage" method="string1" toUtf8 /></p>*/}
            {/*<p><strong>String 2</strong>: <ContractData contract="ComplexStorage" method="string2" toUtf8 /></p>*/}
            {/*<strong>Single Device Data</strong>: <ContractData contract="ComplexStorage" method="singleDD" />*/}

            {/*<br/><br/>*/}
          {/*</div>*/}
        </div>
      </main>
    )
  }
}

export default Home
