import React, { Component } from 'react'
import {Link} from 'react-router';

class MainStart extends Component {
  render() {
    return (
      <div className='container game-all'>
        <div className='row'>
          <div className='col-md-12'>
            <p>HQ On the BlockChain</p>
            <Link className='block-link' to='/create'>Create</Link>
            <Link className='block-link' to='/manage'>Manage</Link>
            <Link className='block-link' to='/play'>Play</Link>
          </div>
        </div>
      </div>
    );
  }
}

export default MainStart
