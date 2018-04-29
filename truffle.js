module.exports = {
  migrations_directory: "./migrations",
  networks: {
    development: {
      host: "localhost",
      port: 7545,
      network_id: 5777 // Match any network id
    },
    ropsten:  {
     network_id: 3,
     host: "localhost",
     port:  8545,
     gas:   2900000
   }
  },
  solc: {
    optimizer: {
      enabled: true,
      runs: 500
    }
  }
};
