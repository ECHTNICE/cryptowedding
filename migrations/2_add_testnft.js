const TestNFT = artifacts.require("TestNFT");

module.exports = async function(deployer, network, accounts) {
  await deployer.deploy(TestNFT);

  if (network == "development") {
    const testNft = await TestNFT.deployed();
    console.log("Creating Test NFTs");

    await testNft.createTest({ from: accounts[0] });
    await testNft.createTest({ from: accounts[0] });
    await testNft.createTest({ from: accounts[0] });
    await testNft.createTest({ from: accounts[0] });

    await testNft.createTest({ from: accounts[1] });
    await testNft.createTest({ from: accounts[1] });
    await testNft.createTest({ from: accounts[1] });
    await testNft.createTest({ from: accounts[1] });

    await testNft.createTest({ from: accounts[2] });
    await testNft.createTest({ from: accounts[2] });
    await testNft.createTest({ from: accounts[2] });
    await testNft.createTest({ from: accounts[2] });
  }
};
