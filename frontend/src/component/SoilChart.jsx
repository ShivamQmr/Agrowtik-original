import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

const soilData = [
  { demand: 10, usdSMAP: 80, subSurface: 90, subSurfaceAnomaly: 50, surface: 100, surfaceAnomaly: 60 },
  { demand: 50, usdSMAP: 150, subSurface: 120, subSurfaceAnomaly: 80, surface: 130, surfaceAnomaly: 100 },
  { demand: 100, usdSMAP: 180, subSurface: 200, subSurfaceAnomaly: 120, surface: 170, surfaceAnomaly: 140 },
  { demand: 150, usdSMAP: 210, subSurface: 220, subSurfaceAnomaly: 160, surface: 210, surfaceAnomaly: 170 },
  { demand: 200, usdSMAP: 250, subSurface: 250, subSurfaceAnomaly: 180, surface: 240, surfaceAnomaly: 190 },
  { demand: 250, usdSMAP: 280, subSurface: 280, subSurfaceAnomaly: 200, surface: 290, surfaceAnomaly: 220 },
  { demand: 300, usdSMAP: 320, subSurface: 310, subSurfaceAnomaly: 240, surface: 330, surfaceAnomaly: 250 },
];

const SoilChart = () => {
  return (
    <div className="flex justify-center items-center p-6">
      <div className="bg-white w-full shadow-lg rounded-lg p-4 hover:shadow-2xl transition duration-500 ease-in-out transform hover:scale-105">
        <h2 className="text-xl font-semibold text-center mb-4">Soil-Related Data</h2>
        <LineChart width={900} height={400} data={soilData}>
          <XAxis dataKey="demand" label={{ value: "Demand (Rate/Kg)", position: "insideBottomRight", offset: -10 }} />
          <YAxis domain={[0, 350]} label={{ value: "Value", angle: -90, position: "insideLeft" }} />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Legend verticalAlign="top" />
          <Line type="monotone" dataKey="usdSMAP" stroke="#8884d8" name="USD SMAP" strokeWidth={2} activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="subSurface" stroke="#82ca9d" name="Sub Surface Soil Moisture" strokeWidth={2} />
          <Line type="monotone" dataKey="subSurfaceAnomaly" stroke="#ffc658" name="Sub Surface Soil Moisture Anomaly" strokeWidth={2} />
          <Line type="monotone" dataKey="surface" stroke="#ff7300" name="Surface Soil Moisture" strokeWidth={2} />
          <Line type="monotone" dataKey="surfaceAnomaly" stroke="#00c49f" name="Surface Soil Moisture Anomaly" strokeWidth={2} />
        </LineChart>
      </div>
    </div>
  );
};

export default SoilChart;
