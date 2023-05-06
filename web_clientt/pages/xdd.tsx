import React from "react";
import { cookies } from "./_app";

export default function xdd() {
  console.log("cookies", cookies.getAll());
  return <div></div>;
}
