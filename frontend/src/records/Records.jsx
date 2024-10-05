import React from "react";
import Sidebar from "../component/Sidebar";
import { useAuth } from "../context/AuthProvider";
import Farmersrecords from "./Farmersrecords";
import Merchantrecords from "./Merchantrecords";

const Records = ({ high }) => {
  const [authUser, setAuthUser] = useAuth();
  return (
    <>
      <Sidebar high={high} />
      {authUser.type == "Farmer" ? <Farmersrecords /> : <Merchantrecords />}
    </>
  );
};

export default Records;
