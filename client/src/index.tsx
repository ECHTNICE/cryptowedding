import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

import getProvider from "./utils/getProvider";
import light from "@parity/light.js";

(async () => {
  const provider = await getProvider();
  light.setProvider(provider);

  ReactDOM.render(<App />, document.getElementById("root"));

  // If you want your app to work offline and load faster, you can change
  // unregister() to register() below. Note this comes with some pitfalls.
  // Learn more about service workers: https://bit.ly/CRA-PWA
  serviceWorker.unregister();
})();
