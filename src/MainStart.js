import React, { Component } from 'react'
import {Link} from 'react-router';

class MainStart extends Component {
  render() {
    return (
      <div className='container game-all'>
        <div className='row'>
          <div className='col-md-12' style={{textAlign: 'center'}}>
            <h1>HQ On the BlockChain</h1>
            <h3><Link className='block-link' to='/create'>Create A New Game</Link></h3>
          </div>
        </div>
      </div>
    );
  }
}

export default MainStart
