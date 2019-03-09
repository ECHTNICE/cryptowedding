import React, { Component } from "react";
import light from "@parity/light.js-react";
import BigNumber from "bignumber.js";
import WeddingCard from "./WeddingCard";
import { getWeddingsContract } from "./utils/contracts";

export interface IWeddingsProps {
  latestWeddingId: BigNumber;
  wedding: any;
}

@light({
  latestWeddingId: () => {
    console.log(getWeddingsContract());
    return getWeddingsContract().getLatestWeddingId$();
  },
  wedding: () => {
    return getWeddingsContract().weddings$(1);
  }
})
class Weddings extends Component<IWeddingsProps> {
  render() {
    console.log(this.props.latestWeddingId.valueOf(), this.props.wedding);

    return (
      <div>
        <h2>Upcomming Weddings ({this.props.latestWeddingId.valueOf()})</h2>

        <WeddingCard />

        <h2>Past Weddings</h2>
      </div>
    );
  }
}

export default Weddings;
