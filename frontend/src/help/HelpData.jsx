import React, { useState } from "react";
import SoilChart from "../component/SoilChart";
import WaterChart from "../component/WaterChart";

const HelpData = () => {
  const [showNepali, setShowNepali] = useState(false);

  const toggleLanguage = () => {
    setShowNepali(!showNepali);
  };

  return (
    <div className="sm:ml-64">
      <div className="p-2 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
        <div className="">
          {/* Page Title */}
          <h1 className="text-2xl font-bold text-center mb-6">{showNepali ? "सहयोग पृष्ठ" : "Help Page"}</h1>

          {/* Language Toggle Button */}
          <div className="text-center mb-4">
            <button onClick={toggleLanguage} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
              {showNepali ? "Switch to English" : "नेपालीमा हेर्नुहोस्"}
            </button>
          </div>

          {/* Instructions Section */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold">{showNepali ? "यो वेबसाइट कसरी प्रयोग गर्ने" : "How to Use This Website"}</h2>
            <p className="mt-2 text-gray-700">
              {showNepali
                ? "यो वेबसाइट तपाईंलाई पानी र माटो सम्बन्धित जानकारी बुझ्न मद्दत गर्नको लागि हो। तलका चार्टहरूले तपाईंको क्षेत्रमा पानीको माग र नमीको स्तर देखाउँछन्। कृपया यो जानकारी कृषकहरूले सजिलै बुझ्न र आफ्नो कार्यमा सुधार ल्याउनको लागि प्रयोग गर्न सक्नुहुन्छ।"
                : "This website is designed to help you understand water and soil-related data. The charts below show water demand and soil moisture levels in your area. This information is especially useful for farmers to monitor and make informed decisions about irrigation and soil health."}
            </p>
          </div>

          {/* Water Data Tutorial */}
          <div className="flex justify-center items-center p-6 mb-6">
            <div className="bg-white w-full shadow-lg rounded-lg p-4 hover:shadow-2xl transition duration-500 ease-in-out transform hover:scale-105">
              <h3 className="text-xl font-semibold text-center mb-4">{showNepali ? "पानी सम्बन्धित डाटा" : "Water Data Tutorial"}</h3>
              <p className="mt-2 text-gray-700">
                {showNepali
                  ? "यो चार्टले नासा, सेन्टिनल र SPoRT बाट पानीको माग र वर्षाको जानकारी देखाउँछ। ग्राफमा देखाइएको 'Demand' भनेको प्रति किलोमा पानीको माग हो। तपाईंले यो जानकारीले आफ्नो क्षेत्रमा सिंचाइको आवश्यकता बुझ्न सक्नुहुन्छ।"
                  : "This chart displays water demand and rainfall data from NASA, Sentinel, and SPoRT. The 'Demand' on the graph represents the water demand per kilogram, which helps you understand the irrigation needs in your area."}
              </p>
              <p className="mt-2 text-gray-700">
                {showNepali
                  ? "रंगहरूको अर्थ यस्तो छ: नीलो रंग NASA IMERGE द्वारा दिएको पानीको जानकारी हो, हरियो रंग Sentinel बाटको पानी सम्बन्धित डाटा हो, पहेँलो SPoRT बाट र सुन्तला रंग वर्षालाई संकेत गर्छ।"
                  : "The colors on the chart represent different data sources: Blue for NASA IMERGE water data, Green for Sentinel, Yellow for SPoRT, and Orange for rainfall."}
              </p>
              <p className="mt-2 text-gray-700">
                {showNepali
                  ? "कसरी प्रयोग गर्ने: पहिलोमा, तपाईंको स्थान चयन गर्नुहोस्। त्यसपछि चार्टमा देखिएका तिथिहरूको आधारमा पानीको माग र वर्षालाई तुलना गर्नुहोस्।"
                  : "How to use: First, select your location. Then, compare the water demand and rainfall levels over time using the dates shown on the chart."}
              </p>
              <div className="mt-4">
                <WaterChart />
              </div>
            </div>
          </div>

          {/* Soil Data Tutorial */}
          <div className="flex justify-center items-center p-6 mb-6">
            <div className="bg-white w-full shadow-lg rounded-lg p-4 hover:shadow-2xl transition duration-500 ease-in-out transform hover:scale-105">
              <h3 className="text-xl font-semibold text-center mb-4">{showNepali ? "माटो सम्बन्धित डाटा" : "Soil Data Tutorial"}</h3>
              <p className="mt-2 text-gray-700">
                {showNepali
                  ? "माटो सम्बन्धित चार्टले सतह र भूमिगत माटोको नमीको स्थिति देखाउँछ। सतह नमीको लागि पहेँलो र भूमिगत नमीको लागि हरियो रंग प्रयोग गरिएको छ।"
                  : "The soil chart displays surface and subsurface moisture levels. Yellow is used for surface moisture and Green for subsurface moisture, helping you assess soil health."}
              </p>
              <p className="mt-2 text-gray-700">
                {showNepali
                  ? "अनौमली भनेको सामान्य अवस्थासँग तुलना गरेर देखाइएको फरक हो, जुन तपाईंले आफ्नो खेतीको व्यवस्थापनमा प्रयोग गर्न सक्नुहुन्छ।"
                  : "Anomalies show deviations from normal moisture conditions, which you can use to adjust your farming practices."}
              </p>
              <p className="mt-2 text-gray-700">
                {showNepali
                  ? "कसरी प्रयोग गर्ने: समय अनुसार माटोको नमी स्तरको परिवर्तन तुलना गर्नुहोस्। माटोको नमी कम भएको अवस्थामा सिंचाइको आवश्यकता हुन सक्छ।"
                  : "How to use: Track changes in soil moisture over time. If surface or subsurface moisture is low, irrigation may be required."}
              </p>
              <div className="mt-4">
                <SoilChart />
              </div>
            </div>
          </div>

          {/* Graph Units Explanation */}
          <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold text-center mb-4">{showNepali ? "ग्राफका इकाइहरू" : "Explanation of Graph Units"}</h3>
            <p className="mt-2 text-gray-700">
              {showNepali
                ? "'Demand' भनेको प्रति किलोको आधारमा पानीको माग हो। सतह र भूमिगत नमी प्रतिशत (%) मा दिइएको छ। अनौमली भनेको सामान्य अवस्थासँग तुलना गरेर देखाइएको फरक हो।"
                : "'Demand' on the graph indicates the water requirement in rate per kilogram. Surface and subsurface moisture levels are displayed as percentages (%). Anomalies show deviations from normal conditions."}
            </p>
            <p className="mt-2 text-gray-700">
              {showNepali
                ? "यस्ता ग्राफहरूले तपाईंलाई आफ्नो क्षेत्रको पानी र माटोको अवस्थालाई ध्यानमा राखी सिंचाइ र खेतीको योजना बनाउन सहयोग पुर्‍याउँछन्।"
                : "These charts help you plan irrigation and farming strategies by understanding the water and soil conditions in your area."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpData;
