import React from "react";
import { useNavigate } from "react-router-dom";

const Homebanner = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="p-4 sm:ml-64">
        <div className="p-2  border-2 border-gray-50 border-dashed rounded-lg dark:border-gray-700 mt-14">
          <section className="overflow-hidden  sm:grid sm:grid-cols-2">
            <div className="p-8 md:p-12 lg:px-16 lg:py-24">
              <div className="mx-auto max-w-xl text-center ltr:sm:text-left rtl:sm:text-right">
                <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">Agrowtik</h2>

                <p className="hidden text-gray-500 md:mt-4 md:block">Our project entitled "Agrowtik" aims to solve the issue for farmers by providing them with a tool to rely on to eradicate wastage of their food.</p>

                <div className="mt-4 md:mt-8">
                  <a onClick={() => navigate("/market")} className="inline-block rounded bg-emerald-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-emerald-700 focus:outline-none focus:ring focus:ring-yellow-400">
                    Go To Market
                  </a>
                </div>
              </div>
            </div>

            <img alt="" src="/paddy.svg" className="h-56 w-full object-cover sm:h-full" />
          </section>
        </div>
      </div>
    </>
  );
};

export default Homebanner;
