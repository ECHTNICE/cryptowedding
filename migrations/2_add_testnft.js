const TestNFT = artifacts.require("TestNFT");

module.exports = async function(deployer, network, accounts) {
  await deployer.deploy(TestNFT);

  if (network == "test" || network == "development") {
    const testNft = await TestNFT.deployed();
    console.log("Creating Test NFTs for account ", accounts[0]);
    await testNft.createTest({ from: accounts[0] });
    await testNft.createTest({ from: accounts[0] });
    await testNft.createTest({ from: accounts[0] });
    await testNft.createTest({ from: accounts[0] });

    console.log("Creating Test NFTs for account ", accounts[1]);
    await testNft.createTest({ from: accounts[1] });
    await testNft.createTest({ from: accounts[1] });
    await testNft.createTest({ from: accounts[1] });
    await testNft.createTest({ from: accounts[1] });

    console.log("Creating Test NFTs for account ", accounts[2]);
    await testNft.createTest({ from: accounts[2] });
    await testNft.createTest({ from: accounts[2] });
    await testNft.createTest({ from: accounts[2] });
    await testNft.createTest({ from: accounts[2] });
  }
};
