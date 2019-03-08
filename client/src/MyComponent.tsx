import * as React from "react";
import { balanceOf$ } from "@parity/light.js";
import light from "@parity/light.js-react";
import BigNumber from "bignumber.js";

export interface IMyComponentProps {
  address: string;
  myBalance: BigNumber;
}

@light({
  myBalance: ({ address }) => {
    return balanceOf$(address); // myAddress here is a prop passed directly to MyComponent
  }
})
class MyComponent extends React.Component<IMyComponentProps> {
  render() {
    return (
      <div>
        The balance of {this.props.address} is{" "}
        {this.props.myBalance.toFormat(2)}.
      </div>
    );
  }
}

export default MyComponent;
