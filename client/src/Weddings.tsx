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
        <h2>Upcomming Weddings ({Number(this.props.latestWeddingId.valueOf())+4})</h2>
          <div>
              <WeddingCard weddingId="0" roomView="01"/>
              <WeddingCard weddingId="0" roomView="02" />
              <WeddingCard weddingId="0" roomView="03" />
              <WeddingCard weddingId="0" roomView="04" />
          </div>
        <h2>Past Weddings</h2>
      </div>
    );
  }
}

export default Weddings;
