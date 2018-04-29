var SimpleStorage = artifacts.require("SimpleStorage");
var TutorialToken = artifacts.require("TutorialToken");
var ComplexStorage = artifacts.require("ComplexStorage");
var GameSolo = artifacts.require("GameSolo");

module.exports = function(deployer) {
  //deployer.deploy(SimpleStorage);
  //deployer.deploy(TutorialToken);
  //deployer.deploy(ComplexStorage);
  deployer.deploy(GameSolo);
};
