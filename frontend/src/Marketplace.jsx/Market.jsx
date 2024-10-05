import React, { useState } from "react";
import Sidebar from "../component/Sidebar";
import { useAuth } from "../context/AuthProvider";
import Sell from "../component/Sell";
import UserPost from "../home/UserPost";
import Buy from "../component/Buy";

const Market = ({ high }) => {
  const [authUser, setAuthUser] = useAuth();
  return (
    <div>
      <Sidebar high={high} />
      {authUser.type == "Farmer" ? (
        <>
          <Sell />
          <UserPost />
        </>
      ) : (
        <>
          <Buy />
        </>
      )}
    </div>
  );
};

export default Market;
