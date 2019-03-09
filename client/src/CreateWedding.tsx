import React, { Component } from "react";
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button
} from "@material-ui/core";

import { getTestNftContractAddress } from "./utils/contracts";
import BigNumber from "bignumber.js";

import {
  getTestNftContract3,
  getWeb3,
  getWeddingsContract3
} from "./utils/web3";

let tokenContractAddr = getTestNftContractAddress();

export interface ICreateWeddingState {
  tokenAddress: string;
  tokenIds: any[];
  tokenId?: any;
  partner: string;
  openDuration: number;
  weddingId: number;
}

export interface ICreateWeddingProps {
  x: BigNumber;
}

class CreateWedding extends Component<any, ICreateWeddingState> {
  state: ICreateWeddingState = {
    tokenAddress: tokenContractAddr,
    tokenIds: [],
    partner: "0x7c6ce8e1db7f2124ddc8a97ed594c74fba7281f9",
    openDuration: 0,
    weddingId: 0
  };

  async componentDidMount() {
    const web3 = await getWeb3();
    const nft = await getTestNftContract3();

    const accounts = await web3.eth.getAccounts();

    const balance = await nft.methods.balanceOf(accounts[0]).call();

    const tokenIdPromises = [];
    for (let i = 0; i < balance; i++) {
      tokenIdPromises.push(
        nft.methods.tokenOfOwnerByIndex(accounts[0], i).call()
      );
    }
    const tokenIds = await Promise.all(tokenIdPromises);
    console.log(tokenIds);

    this.setState({ tokenIds: tokenIds, tokenId: tokenIds[0] });
  }

  handleTokenAddressChange = () => {};
  handleTokenIdChange = (event: any) => {
    this.setState({ tokenId: event.target.value });
  };

  createWeding = async () => {
    const web3 = await getWeb3();
    const wedding = await getWeddingsContract3();

    const accounts = await web3.eth.getAccounts();
    console.log(
      "Creating Wedding: ",
      tokenContractAddr,
      this.state.tokenId,
      this.state.partner,
      this.state.openDuration
    );

    await wedding.methods
      .createWedding(
        tokenContractAddr,
        this.state.tokenId,
        this.state.partner,
        this.state.openDuration
      )
      .send({ from: accounts[0] });

    const weddingId = await wedding.methods
      .getWeddingIdByProposer(tokenContractAddr, this.state.tokenId)
      .call();
    console.log("WeddingId:", weddingId);
    this.setState({ weddingId: weddingId });
  };

  render() {
    //console.log("balanceOf", this.props.x.valueOf());
    return (
      <div>
        <h1>Create wedding</h1>
        <form noValidate autoComplete="off">
          <FormControl>
            <InputLabel htmlFor="tokenAddress">Token</InputLabel>
            <Select
              value={this.state.tokenAddress}
              onChange={this.handleTokenAddressChange}
              inputProps={{
                name: "tokenAddress",
                id: "tokenAddress"
              }}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={tokenContractAddr}>CryptoKities</MenuItem>
            </Select>
          </FormControl>

          <Button
            variant="contained"
            color="primary"
            onClick={this.createWeding}
          >
            Create wedding proposal
          </Button>
        </form>
        WeddingId {this.state.weddingId}
      </div>
    );
  }
}

export default CreateWedding;

/*<FormControl>
<InputLabel htmlFor="tokenId">TokenId</InputLabel>
<Select
  value={this.state.tokenId}
  onChange={this.handleTokenIdChange}
  inputProps={{
    name: "tokenId",
    id: "tokenId"
  }}
>
  <MenuItem value="">
    <em>None</em>
  </MenuItem>
  {this.state.tokenIds.map(tokenId => (
    <MenuItem key={tokenId} value={tokenId}>
      {tokenId}
    </MenuItem>
  ))}
</Select>
</FormControl>*/
