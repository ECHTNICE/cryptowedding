const TestNFT = artifacts.require("TestNFT");

contract("TestNFT", accounts => {
  it("check that accounts[0] has 4 nfts", async () => {
    const instance = await TestNFT.deployed();
    const balance = await instance.balanceOf.call(accounts[0]);

    assert.equal(balance.valueOf(), 4);
  });
});
