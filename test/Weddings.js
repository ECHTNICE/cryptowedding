const TestNFT = artifacts.require("TestNFT");
const Weddings = artifacts.require("Weddings");

const WeddingState = {
  Proposed: 0,
  Accepted: 1,
  Declined: 2,
  Divorsed: 3
};

contract("Weddings", accounts => {
  const partner = accounts[1];
  const guest = accounts[2];

  const openDuration = 0;

  it("should create new wedding", async () => {
    const testNftInstance = await TestNFT.deployed();
    const instance = await Weddings.deployed();

    const tokenContractAddr = testNftInstance.address;
    const tokenId = 1;

    await instance.createWedding(
      tokenContractAddr,
      tokenId,
      partner,
      openDuration
    );

    const weddingId = await instance.getWeddingIdByProposer.call(
      tokenContractAddr,
      tokenId
    );

    assert.equal(weddingId.valueOf(), 1);
  });

  it("should fetch and verfiy wedding details", async () => {
    const testNftInstance = await TestNFT.deployed();
    const instance = await Weddings.deployed();

    const tokenContractAddr = testNftInstance.address;
    const tokenId = 1;

    const weddingId = 1;
    const wedding = await instance.weddings.call(weddingId);

    assert.equal(wedding.id.valueOf(), weddingId);
    assert.equal(wedding.state.valueOf(), WeddingState.Proposed);

    assert.equal(wedding.tokenContractA, tokenContractAddr);
    assert.equal(wedding.tokenIdA.valueOf(), tokenId);

    assert.equal(wedding.partner, partner);
    assert.equal(
      wedding.tokenContractB,
      "0x0000000000000000000000000000000000000000"
    );
    assert.equal(wedding.tokenIdB.valueOf(), 0);

    assert.equal(wedding.openDuration.valueOf(), 0);
  });

  it("should return getLatestWeddingId", async () => {
    const instance = await Weddings.deployed();

    const weddingId = await instance.getLatestWeddingId.call();
    assert.equal(weddingId.valueOf(), 1);
  });

  it("should accept wedding", async () => {
    const testNftInstance = await TestNFT.deployed();
    const instance = await Weddings.deployed();

    const tokenContractAddr = testNftInstance.address;
    const tokenId = 5;

    const weddingId = 1;
    await instance.acceptWedding(weddingId, tokenContractAddr, tokenId, {
      from: partner
    });

    const wedding = await instance.weddings.call(weddingId);

    assert.equal(wedding.id.valueOf(), weddingId);
    assert.equal(wedding.state.valueOf(), WeddingState.Accepted);

    assert.equal(wedding.tokenContractB, tokenContractAddr);
    assert.equal(wedding.tokenIdB.valueOf(), tokenId);
  });

  it("should join guest", async () => {
    const testNftInstance = await TestNFT.deployed();
    const instance = await Weddings.deployed();

    const tokenContractAddr = testNftInstance.address;
    const tokenId = 9;

    const weddingId = 1;
    await instance.joinWedding(weddingId, tokenContractAddr, tokenId, {
      from: guest
    });

    const wedding = await instance.weddings.call(weddingId);
    const weddingGuest = await instance.weddingGuests.call(weddingId, 0);

    assert.equal(wedding.guestCount.valueOf(), 1);
    assert.equal(weddingGuest.tokenId.valueOf(), tokenId);
    assert.equal(weddingGuest.tokenContract, tokenContractAddr);
  });
});
