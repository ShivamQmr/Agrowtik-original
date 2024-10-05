import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

// Sample data for the chart
const data = [
  { demand: 10, nasa: 50, sentinel: 30, sport: 100, rainfall: 80 },
  { demand: 50, nasa: 100, sentinel: 120, sport: 150, rainfall: 110 },
  { demand: 100, nasa: 150, sentinel: 100, sport: 200, rainfall: 130 },
  { demand: 150, nasa: 200, sentinel: 180, sport: 250, rainfall: 180 },
  { demand: 200, nasa: 220, sentinel: 200, sport: 280, rainfall: 240 },
  { demand: 250, nasa: 300, sentinel: 250, sport: 300, rainfall: 290 },
  { demand: 300, nasa: 350, sentinel: 300, sport: 320, rainfall: 330 },
];

const WaterChart = () => {
  return (
    <div className="flex justify-center items-center p-6">
      <div className="bg-white  w-full shadow-lg rounded-lg p-4 hover:shadow-2xl transition duration-500 ease-in-out transform hover:scale-105">
        <h2 className="text-xl font-semibold text-center mb-4">Water-Related Data</h2>
        <LineChart width={900} height={400} data={data}>
          <XAxis dataKey="demand" label={{ value: "Demand (Rate/Kg)", position: "insideBottomRight", offset: -10 }} />
          <YAxis domain={[0, 350]} label={{ value: "Value", angle: -90, position: "insideLeft" }} />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Legend verticalAlign="top" />
          <Line type="monotone" dataKey="nasa" stroke="#8884d8" name="NASA Imerge" strokeWidth={2} activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="sentinel" stroke="#82ca9d" name="Sentinel" strokeWidth={2} />
          <Line type="monotone" dataKey="sport" stroke="#ffc658" name="SPoRT" strokeWidth={2} />
          <Line type="monotone" dataKey="rainfall" stroke="#ff7300" name="Rainfall" strokeWidth={2} />
        </LineChart>
      </div>
    </div>
  );
};

export default WaterChart;
