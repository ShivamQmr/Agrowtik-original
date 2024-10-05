import React from "react";
import { useAuth } from "../context/AuthProvider";
import Sell from "../component/Sell";

const Dashboardbanner = () => {
  const [authUser, setAuthUser] = useAuth();
  return (
    <>
      <div className="p-4 sm:ml-64">
        <div className="p-2  border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
          <span className=" text-green-600 font-semibold text-sm">Welocme back {authUser.fullName}!</span>
          <div className=" w-full">
            <img className="mx-auto" src="/dummy_graph.avif"></img>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboardbanner;
