import React from "react";
import WaterChart from "../component/WaterChart";
import SoilChart from "../component/SoilChart";

const Chart = () => {
  return (
    <>
      <div className="p-4 sm:ml-64">
        <div className="p-2  border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
          <WaterChart />
          <SoilChart />
        </div>
      </div>
    </>
  );
};

export default Chart;
