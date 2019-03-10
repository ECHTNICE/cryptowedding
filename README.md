# cryptowedding

ETHParis 2019 hackthon - Marry your NFTs at https://cryptowedding.echtnice.com

## Inspiration

There are more and more NFTs and we wanted to show that there are many more use cases for NFTs and all that with something fun and a wink.

Since we were dealing with real world problems, we wanted to take a break and do something completely different than always to save the world. ;-)


## What it does

The idea was to provide a platform to marry any two 
Non-Fungible Tokens (NFTs) and invite even more NFTs to the wedding as guests 
(For now only KryptoKitties are supported).
To celebrate the wedding, all NTFs are loaded into a wedding scene and rendered
as a animation and can be saved as a PNG. 
Both NFTs receive a marriage certificate in the form of an additional NFT. 
The original plan was to make the NFT itself own the certificate by using the 
EIP998 standard (An extension of the ERC721 standard to enable ERC721 tokens to own other ERC721 tokens and ERC20 tokens.)
This ist not implemented yet and the certificate is owned by the owner of the NFTs for now.

## How we built it

We build a SmartContract system that arranges Weddings between two NFTs and their guests. It also 
creates wedding certificates as NFTs.
We created a Website which acts as a frontend to the SmartContract system
We used EIP721 to fetch NFTs (for now only KryptoKitties).
We created a nice wedding scene which is animated, supports different themes and
can be saved an image.

## Challenges we ran into

EIP998 standard is cool but needs more work.
Never use Typescript at a hackathon again.
Light.js is also cool but rx.js is hard xD
NFT can have a License. Not sure if CryptoWeddings is compliant with it. (https://www.niftylicense.org/)

## Accomplishments that we're proud of

there are different Rooms
there are different Mentors
there are different Music

## What we learned

See Challenges

React, lightjs, web3js
EIP721
EIP998

## What's next for CryptoWedding

We wanna support more NFTs and make it more robust.
Wedding certificates should be based on the EIP998 standard 
and owned by the NFT itself.
Add more features and animations to the wedding scene. 

other NFTs


## Setup test environment

### Ganache

Ganache can be deployed and started with

```bash
cd cryptowedding
npm run ganache
npm run migrate
```

Now you have to configure your wallet to use our ganache instance.
In Metamask configure a new network at `http://127.0.0.1:8545` and use the
mnemonic `bone ripple jeans toddler drink soft coast shell emerge chat wolf produce`.

## Useful Resources

- [https://paritytech.github.io/js-libs/light.js/](https://paritytech.github.io/js-libs/light.js/)
- [https://material-ui.com/getting-started/installation/](https://material-ui.com/getting-started/installation/)
- [https://truffleframework.com/docs/truffle/overview](https://truffleframework.com/docs/truffle/overview)
