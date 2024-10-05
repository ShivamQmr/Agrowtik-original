import React from "react";
import Sidebar from "../component/Sidebar";
import Dashboardbanner from "./Dashboardbanner";
import { useAuth } from "../context/AuthProvider";
import Chart from "./Chart";

const Home = ({ high }) => {
  const [authUser, setAuthUser] = useAuth();
  return (
    <>
      <Sidebar high={high} />
      <Chart />
    </>
  );
};

export default Home;
