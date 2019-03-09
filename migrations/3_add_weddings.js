const Weddings = artifacts.require("Weddings");
const TestNFT = artifacts.require("TestNFT");

module.exports = async function(deployer, network, accounts) {
  deployer.deploy(Weddings);

  if (network == "development") {
    const testNft = await TestNFT.deployed();
    const weddings = await Weddings.deployed();

    const partner = accounts[1];
    const tokenIdB = 5;

    const openDuration = 0;
    const tokenContractAddr = testNft.address;
    const tokenIdA = 1;

    await weddings.createWedding(
      tokenContractAddr,
      tokenIdA,
      partner,
      openDuration
    );

    /*const weddingId = await weddings.getWeddingIdByProposer.call(
      tokenContractAddr,
      tokenIdA
    );

    await weddings.acceptWedding(
      weddingId.valueOf(),
      tokenContractAddr,
      tokenIdB,
      {
        from: partner
      }
    );*/
  }
};
