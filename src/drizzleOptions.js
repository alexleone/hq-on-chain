import GameFactory from './../build/contracts/GameFactory.json'
import GameSolo from  './../build/contracts/GameSolo.json'

const drizzleOptions = {
  web3: {
    block: false,
    fallback: {
      type: 'ws',
      url: 'ws://127.0.0.1:7545'
    }
  },
  contracts: [
    GameSolo,
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
