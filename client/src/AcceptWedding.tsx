import React, { Component } from "react";
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Grid,
  Paper,
  Typography
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
  getNftTokenIdsOfAccount,
  getWedding
} from "./utils/web3";
import { Link } from "react-router-dom";

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
    },
    nftImageContainer: {
      display: "flex",
      width: "100%",
      justifyContent: "center"
    },
    nftImage: {
      height: 150
    }
  });

let tokenContractAddr = getTestNftContractAddress();

export interface IAcceptWeddingState {
  tokenAddress: string;
  tokenIds: any[];
  tokenId?: any;

  accepted: boolean;
  wedding: any;
}

export interface IAcceptWeddingProps
  extends WithStyles<typeof styles>,
    WithTheme {
  x: BigNumber;
}

class AcceptWedding extends Component<
  IAcceptWeddingProps,
  IAcceptWeddingState
> {
  state: IAcceptWeddingState = {
    tokenAddress: tokenContractAddr,
    tokenIds: [],
    tokenId: 0,
    accepted: false,
    wedding: {}
  };

  async componentDidMount() {
    const wedding = await getWedding(
      (this.props as any).match.params.weddingId
    );
    const tokenIds = await getNftTokenIdsOfAccount();

    this.setState({
      tokenIds: tokenIds,
      tokenId: tokenIds[0],
      wedding: wedding
    });
  }

  handleTokenAddressChange = () => {};

  handleTokenIdChange = (event: any) => {
    this.setState({ tokenId: event.target.value });
  };

  acceptWedding = async () => {
    const web3 = await getWeb3();
    const wedding = await getWeddingsContract3();

    const accounts = await web3.eth.getAccounts();
    console.log("Accept Wedding: ", tokenContractAddr, this.state.tokenId);

    await wedding.methods
      .acceptWedding(
        this.state.wedding.id,
        tokenContractAddr,
        this.state.tokenId
      )
      .send({ from: accounts[0] });

    this.setState({ accepted: true });
  };

  getNftImageUrl = (tokenId: string) => {
    return (
      "https://img.cryptokitties.co/0x06012c8cf97bead5deae237070f9587f8e7a266d/" +
      tokenId +
      ".png"
    );
  };

  render() {
    const { classes } = this.props;

    let resultBox = null;
    if (this.state.accepted) {
      resultBox = (
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <h1>Success!</h1>
            <Typography variant="body1" gutterBottom>
              Invite all your friends to your wedding by sharing the following
              link with them.
              <Link to={"/join/" + this.state.wedding.id}>
                Link to join the wedding as guest
              </Link>
            </Typography>
          </Paper>
        </Grid>
      );
    }

    //console.log("balanceOf", this.props.x.valueOf());
    return (
      <div>
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <h1>Accept wedding proposal</h1>
              <div className={classes.nftImageContainer}>
                <img
                  className={classes.nftImage}
                  src={this.getNftImageUrl(this.state.wedding.tokenIdA)}
                />
              </div>
              <Typography variant="body1" gutterBottom>
                This NFT wants to marry you! Do you have a NFT that wants to
                marry it too?
              </Typography>
              <form noValidate autoComplete="off" className={classes.root}>
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

                <div className={classes.nftImageContainer}>
                  <img
                    className={classes.nftImage}
                    src={this.getNftImageUrl(this.state.tokenId)}
                  />
                </div>

                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  style={{ margin: 8 }}
                  onClick={this.acceptWedding}
                >
                  Accept wedding proposal
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

export default withStyles(styles, { withTheme: true })(AcceptWedding);
