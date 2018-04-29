var GameFactory = artifacts.require("GameFactory");

module.exports = function(deployer) {
  deployer.deploy(GameFactory);
};
