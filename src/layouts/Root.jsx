import React from "react";
import App from "../App";
import { Outlet } from "react-router";

const Root = () => {
  return (
    <div>
      <Outlet></Outlet>
    </div>
  );
};

export default Root;
