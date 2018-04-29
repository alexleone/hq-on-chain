import store from '../../store'
import Web3 from 'web3'

export const WEB3_INITIALIZED = 'WEB3_INITIALIZED'
function web3Initialized(results) {
  return {
    type: WEB3_INITIALIZED,
    payload: results
  }
}

let getWeb3 = new Promise(function(resolve, reject) {
  // Wait for loading completion to avoid race conditions with web3 injection timing.
  window.addEventListener('load', function(dispatch) {
    var results
    var _web3

    // Checking if Web3 has been injected by the browser (Mist/MetaMask)
    // eslint-disable-next-line no-undef
    if (typeof web3 !== 'undefined') {
      // Use Mist/MetaMask's provider.
      // eslint-disable-next-line no-undef
      _web3 = new Web3(web3.currentProvider)

      results = {
        web3Instance: _web3
      }

      console.log('Injected web3 detected. This is from src/util/web3/getWeb3.js');

      resolve(store.dispatch(web3Initialized(results)))
    } else {

      // Fallback to localhost if no web3 injection.

      var provider = new Web3.providers.HttpProvider('http://localhost:8545')

      _web3 = new Web3(provider)

      results = {
        web3Instance: _web3
      }

      console.log('No web3 instance injected, using Local web3.');

      resolve(store.dispatch(web3Initialized(results)))
    }

    // TODO: Error checking.
  })
})

export default getWeb3
