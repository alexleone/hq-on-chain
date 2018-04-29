module.exports = {
  migrations_directory: "./migrations",
  networks: {
    development: {
      host: "localhost",
      port: 8545,
      network_id: "*" // Match any network id
    },
    ropsten:  {
      network_id: 3,
      host: "localhost",
      port:  8545,
      gas:   2900000
    },
    quicknode: {
      host: "https://currently-possible-lamprey.quiknode.io/462bef37-beb3-45a9-8417-5c867cbaa39f/gGA940AS5Mv7f17jf7_Teg==/",
      port: 443,
      network_id: "3"
    }
  }
};
