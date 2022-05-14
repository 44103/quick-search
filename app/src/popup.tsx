import * as React from "react";
import * as ReactDOM from "react-dom";

import Config from "./Config";
import "./popup.css";

var mountNode = document.getElementById("popup");
ReactDOM.render(<Config />, mountNode);
