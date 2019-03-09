const Weddings = artifacts.require("Weddings");

module.exports = function(deployer) {
  deployer.deploy(Weddings);
};
