pragma solidity >=0.4.21 <0.6.0;

import "openzeppelin-solidity/contracts/token/ERC721/ERC721Full.sol";
import "openzeppelin-solidity/contracts/drafts/Counter.sol";

/*
 * Based on https://docs.openzeppelin.org/docs/learn-about-tokens.html#erc721
 */
contract TestNFT is ERC721Full {
    using Counter for Counter.Counter;
    Counter.Counter private tokenId;

    constructor()
        ERC721Full("TestNFT", "TTT")
        public
    {}

    function createTest()
        public
        returns (bool)
    {
        uint256 testTokenId = tokenId.next();
        _mint(msg.sender, testTokenId);
        _setTokenURI(testTokenId, "https://example.com/doggo.json");
        return true;
    }
}