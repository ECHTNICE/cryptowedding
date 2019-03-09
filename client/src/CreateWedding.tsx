import React, { Component } from "react";
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Grid,
  Paper
} from "@material-ui/core";
import {
  withStyles,
  createStyles,
  Theme,
  WithStyles,
  WithTheme
} from "@material-ui/core/styles";
import { getTestNftContractAddress } from "./utils/contracts";
import BigNumber from "bignumber.js";

import {
  getTestNftContract3,
  getWeb3,
  getWeddingsContract3,
  getNftTokenIdsOfAccount
} from "./utils/web3";

const styles = (theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexWrap: "wrap"
    },
    formControl: {
      margin: theme.spacing.unit,
      minWidth: "100%"
    },
    selectEmpty: {
      marginTop: theme.spacing.unit * 2
    },
    paper: {
      padding: theme.spacing.unit * 2,
      textAlign: "center",
      color: theme.palette.text.secondary
    }
  });

let tokenContractAddr = getTestNftContractAddress();

export interface ICreateWeddingState {
  tokenAddress: string;
  tokenIds: any[];
  tokenId?: any;
  partner: string;
  openDuration: number;
  weddingId: number;
}

export interface ICreateWeddingProps
  extends WithStyles<typeof styles>,
    WithTheme {
  x: BigNumber;
}

class CreateWedding extends Component<
  ICreateWeddingProps,
  ICreateWeddingState
> {
  state: ICreateWeddingState = {
    tokenAddress: tokenContractAddr,
    tokenIds: [],
    tokenId: 0,
    partner: "0x7c6ce8e1db7f2124ddc8a97ed594c74fba7281f9",
    openDuration: 0,
    weddingId: 0
  };

  async componentDidMount() {
    const tokenIds = await getNftTokenIdsOfAccount();

    this.setState({ tokenIds: tokenIds, tokenId: tokenIds[0] });
  }

  handleTokenAddressChange = () => {};
  handlePartnerChange = () => {};

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
    const { classes } = this.props;

    let resultBox = null;
    if (this.state.weddingId) {
      resultBox = (
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            WeddingId {this.state.weddingId}
          </Paper>
        </Grid>
      );
    }

    //console.log("balanceOf", this.props.x.valueOf());
    return (
      <div>
        <h1>Create wedding</h1>
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <form noValidate autoComplete="off" className={classes.root}>
                <TextField
                  id="standard-full-width"
                  label="Account"
                  style={{ margin: 8 }}
                  placeholder="0x7c6ce8e1db7f2124ddc8a97ed594c74fba7281f9"
                  helperText="Owner account of the NFT you wanna marry"
                  fullWidth
                  margin="normal"
                  value={this.state.partner}
                  onChange={this.handlePartnerChange}
                  InputLabelProps={{
                    shrink: true
                  }}
                />

                <FormControl className={classes.formControl}>
                  <InputLabel htmlFor="tokenAddress">Token</InputLabel>
                  <Select
                    value={this.state.tokenAddress}
                    onChange={this.handleTokenAddressChange}
                    autoWidth={true}
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

                <FormControl className={classes.formControl}>
                  <InputLabel htmlFor="tokenId">TokenId</InputLabel>
                  <Select
                    value={this.state.tokenId}
                    onChange={this.handleTokenIdChange}
                    autoWidth={true}
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
                </FormControl>

                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  style={{ margin: 8 }}
                  onClick={this.createWeding}
                >
                  Create wedding proposal
                </Button>
              </form>
            </Paper>
          </Grid>
          {resultBox}
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(CreateWedding);

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
