import React from "react";
import News from "./News.json";
import Newsarticle from "./Newsarticle";

const Newsbanner = () => {
  return (
    <>
      <div className="p-4 sm:ml-64">
        <div className="p-2 max-w-max border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
          {News.map((News) => (
            <Newsarticle key={News.id} News={News} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Newsbanner;
