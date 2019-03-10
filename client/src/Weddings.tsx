import React, { Component } from "react";
import light from "@parity/light.js-react";
import BigNumber from "bignumber.js";
import WeddingCard from "./WeddingCard";
import { getWeddingsContract } from "./utils/contracts";
import { getWeddingList } from "./utils/web3";

export interface IWeddingsProps {}

export interface IWeddingsState {
  weddingList: any[];
}

class Weddings extends Component<IWeddingsProps, IWeddingsState> {
  state: IWeddingsState = {
    weddingList: []
  };

  async componentDidMount() {
    const weddingList = await getWeddingList();
    this.setState({ weddingList });
  }

  render() {
    return (
      <div>
        <h2>Upcomming Weddings ({this.state.weddingList.length + 4})</h2>
        <div>
          {this.state.weddingList.map(w => (
            <WeddingCard
              key={w.id.valueOf()}
              weddingId={w.id.valueOf()}
              roomView={"0" + (w.id.valueOf() % 4).toString()}
            />
          ))}
          <WeddingCard weddingId="0" roomView="01" />
          <WeddingCard weddingId="0" roomView="02" />
          <WeddingCard weddingId="0" roomView="03" />
          <WeddingCard weddingId="0" roomView="04" />
        </div>
      </div>
    );
  }
}

export default Weddings;
