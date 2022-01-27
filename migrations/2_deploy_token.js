const ManualNftMint = artifacts.require("ManualNftMint");

module.exports = function (deployer) {
  deployer.deploy(ManualNftMint)
  .then(() => console.log(ManualNftMint.address))
};
