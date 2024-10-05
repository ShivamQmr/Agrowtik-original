import React from "react";
import Sidebar from "../component/Sidebar";
import Newsbanner from "./Newsbanner";

const News = ({ high }) => {
  return (
    <>
      <Sidebar high={high} />
      <Newsbanner />
    </>
  );
};

export default News;
