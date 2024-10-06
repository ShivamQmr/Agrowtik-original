import React from "react";
import Sidebar from "../component/Sidebar";
import Dashboardbanner from "./Dashboardbanner";
import { useAuth } from "../context/AuthProvider";
import Chart from "./Chart";
import Homebanner from "./Homebanner";

const Home = ({ high }) => {
  const [authUser, setAuthUser] = useAuth();
  return (
    <>
      <Sidebar high={high} />
      <Homebanner />
      <Chart />
    </>
  );
};

export default Home;
