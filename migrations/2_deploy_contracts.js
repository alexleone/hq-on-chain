var GameFactory = artifacts.require("GameFactory");
var GameSolo = artifacts.require("GameSolo");

module.exports = function(deployer) {
  deployer.deploy(GameFactory);
  deployer.deploy(GameSolo);
};
