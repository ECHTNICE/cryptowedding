import React, { Component } from "react";
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from "@material-ui/core";
import light from "@parity/light.js-react";
import {
  getTestNftContractAddress,
  getTestNftContract
} from "./utils/contracts";
import BigNumber from "bignumber.js";
import MyComponent from "./MyComponent";
import { defaultAccount$ } from "@parity/light.js";
import {
  map,
  mergeMap,
  flatMap,
  switchMap,
  concatAll,
  concatMap
} from "rxjs/operators";
import { forkJoin, Observable, from } from "rxjs";

let tokenContractAddr = getTestNftContractAddress();

export interface ICreateWeddingState {
  tokenAddress: string;
}

export interface ICreateWeddingProps {
  x: BigNumber;
}

/*switchMap(publicAddress => {
    addr = publicAddress;
    return contract.balanceOf$(publicAddress);
  }),
  mergeMap(balance => {
    let res = [];
    for (let i = 0; i < balance; i++) {
      console.log("fetching id", i);
      res.push(contract.tokenOfOwnerByIndex$(addr, i));
    }
    return res;
  }),
  mergeMap(idx => idx)
*/

@light({
  x: () => {
    const contract = getTestNftContract();
    console.log(contract);
    let addr = "";
    return defaultAccount$().pipe(
      switchMap(publicAddress => {
        addr = publicAddress;
        return contract.balanceOf$(publicAddress);
      }),
      mergeMap(balance => {
        let res = [];
        for (let i = 0; i < balance; i++) {
          console.log("fetching id", i);
          res.push(contract.tokenOfOwnerByIndex$(addr, i));
        }
        return res;
      }),
      mergeMap(idx => idx)
    );
  }
})
class CreateWedding extends Component<any, ICreateWeddingState> {
  state = {
    tokenAddress: tokenContractAddr
  };

  handleTokenAddressChange = () => {};

  render() {
    console.log("balanceOf", this.props.x.valueOf());
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
          <FormControl>
            <TextField id="standard-name" label="Name" margin="normal" />
          </FormControl>
        </form>
        <MyComponent address="0x9c9e2615c04137c01cffdd1ed424fa3893c64194" />
      </div>
    );
  }
}

export default CreateWedding;
