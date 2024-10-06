import React from "react";
import Sidebar from "../component/Sidebar";
import HelpData from "./HelpData";

const Help = ({ high }) => {
  return (
    <>
      <Sidebar high={high} />
      <HelpData />
    </>
  );
};

export default Help;
