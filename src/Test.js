import React, { Component } from 'react'
import { Link } from 'react-router';
import { AccountData, ContractData, ContractForm } from 'drizzle-react-components'

class Test extends Component {
  constructor(props, context) {
    super(props, context);
    // debugger
    // var state = context.drizzle.store.getState();
    console.log('props');
    console.log(props);

    console.log('context');
    console.log(context);
    //
    // console.log('state');
    // console.log(state);
  }

  render() {
    return (
      <div className='container game-all'>
        <div className='row'>
          <div className='col-md-12'>
            <p>HQ On the BlockChain</p>
            <Link className='block-link' to='/create'>Create</Link>
            <Link className='block-link' to='/manage'>Manage</Link>
            <Link className='block-link' to='/play'>Play</Link>

            {/*<ContractData contract="TutorialToken" method="balanceOf" methodArgs={[this.props.accounts[0]]}/>*/}

          </div>
        </div>
      </div>
    );
  }
}

export default Test
