pragma solidity >=0.4.21 <0.6.0;

import "openzeppelin-solidity/contracts/drafts/Counter.sol";
import "openzeppelin-solidity/contracts/token/ERC721/IERC721.sol";

contract Weddings {
    using Counter for Counter.Counter;

    //struct Nft {
    //    address tokenContract;
    //    uint256 tokenId;
    //}

    enum WeddingState {
        Proposed,
        Accepted,
        Declined,
        Divorsed
    }

    struct Wedding {
        uint256 id;
        WeddingState state;

        address tokenContractA;
        uint256 tokenIdA;

        address partner;
        address tokenContractB;
        uint256 tokenIdB;

        uint256 openDuration;
    }

    Counter.Counter private _weddingId;
    uint256 private _latestWeddingId;

    mapping(uint256 => Wedding) public weddings;
    mapping(address => mapping(uint256 => uint256)) private _proposerToWeddingIds;

    event WeddingAccepted(uint256 indexed weddingId);

    constructor() public {
        _latestWeddingId = 0;
    }

    // XXX: Needs AbiEncoderV2
    //function getWedding(uint256 weddingId) public returns (Wedding memory wedding) {
    //    return _weddings[weddingId];
    //}

    function getLatestWeddingId() public view returns (uint256 weddingId) {
        return _latestWeddingId;
    }

    function getWeddingIdByProposer(address tokenContractAddr, uint256 tokenId) 
        public view returns (uint256 weddingId) {
        require(tokenContractAddr != address(0), "tokenContractAddr must not be 0");
        require(tokenId != 0, "tokenId must not be 0");

        return _proposerToWeddingIds[tokenContractAddr][tokenId];
    }

    function createWedding(
        address tokenContractAddr,
        uint256 tokenId,
        address partnerAddr,
        uint256 openDuration)
        public returns (uint256 weddingId) {

        require(tokenContractAddr != address(0), "tokenContractAddr must not be 0");
        require(tokenId != 0, "tokenId must not be 0");
        IERC721 tokenContract = IERC721(tokenContractAddr);
        require(msg.sender == tokenContract.ownerOf(tokenId), "Token not owned by sender");
        require(partnerAddr != address(0), "partner must not be 0");

        _latestWeddingId = _weddingId.next();

        Wedding memory wedding = Wedding({
            id: _latestWeddingId,
            state: WeddingState.Proposed,

            tokenContractA: tokenContractAddr,
            tokenIdA: tokenId,

            partner: partnerAddr,
            tokenContractB: address(0),
            tokenIdB: 0,

            openDuration: openDuration
        });
        weddings[wedding.id] = wedding;
        _proposerToWeddingIds[tokenContractAddr][tokenId] = wedding.id;
        
        return wedding.id;
    }

    function acceptWedding(
        uint256 weddingId,
        address tokenContractAddr,
        uint256 tokenId)
        public returns (bool success) {
        require(weddingId != 0, "weddingId must not be 0");
        require(tokenContractAddr != address(0), "tokenContractAddr must not be 0");
        require(tokenId != 0, "tokenId must not be 0");
        IERC721 tokenContract = IERC721(tokenContractAddr);
        require(msg.sender == tokenContract.ownerOf(tokenId), "Token not owned by sender");

        // TODO: check that wedding exists.
        Wedding storage wedding = weddings[weddingId];
        wedding.state = WeddingState.Accepted;
        wedding.tokenContractB = tokenContractAddr;
        wedding.tokenIdB = tokenId;

        //emit WeddingAccepted(weddingId);

        return true;
    }

    function joinWedding(
        uint256 weddingId,
        address tokenContract,
        uint256 tokenId)
        public returns (bool success) {
        return true;
    }

    /*function divorce(
        uint256 weddingId,
        address tokenContract,
        uint256 tokenId)
        public returns (bool success) {
        return true;
    }

    function leaveWedding(
        uint256 weddingId,
        address tokenContract,
        uint256 tokenId)
        public returns (bool success) {
        return true;
    }*/
}