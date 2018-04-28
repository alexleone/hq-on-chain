// import ComplexStorage from './../build/contracts/ComplexStorage.json'
// import SimpleStorage from './../build/contracts/SimpleStorage.json'
// import TutorialToken from './../build/contracts/TutorialToken.json'
import GameFactory from './../build/contracts/GameFactory.json'

const drizzleOptions = {
  web3: {
    block: false,
    fallback: {
      type: 'ws',
      url: 'ws://127.0.0.1:7545'
    }
  },
  contracts: [
    // ComplexStorage,
    // SimpleStorage,
    // TutorialToken,
    GameFactory
  ],
  events: {
    // SimpleStorage: ['StorageSet']
  },
  polls: {
    accounts: 1500
  }
};

export default drizzleOptions
