# cryptowedding

ETHParis 2019 hackthon - Marry your NFTs at https://cryptowedding.echtnice.com

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
