import React from "react";
import { BounceLoader } from "react-spinners";

export default function Spinner(props) {
  return <BounceLoader {...props} color={"#b0b0b0"} size={45} />;
}
