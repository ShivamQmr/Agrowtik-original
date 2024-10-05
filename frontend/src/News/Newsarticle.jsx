import React from "react";

const Newsarticle = ({ News }) => {
  return (
    <>
      <article key={News.id} className="rounded-xl border-2 border-gray-100 bg-white">
        <div className="flex items-start gap-4 p-4 sm:p-6 lg:p-8">
          <a href="#" className="block shrink-0">
            <img alt="" src="/nepali.png" className="size-14 rounded-lg object-cover" />
          </a>

          <div>
            <h3 className="font-medium sm:text-lg">
              <a href="#" className="hover:underline">
                {News.title}
              </a>
            </h3>

            <p className="line-clamp-2 text-sm text-gray-700">{News.body}</p>

            <div className="mt-2 sm:flex sm:items-center sm:gap-2">
              <span className="hidden sm:block" aria-hidden="true">
                &middot;
              </span>

              <p className="hidden sm:block sm:text-xs sm:text-gray-500">
                Posted by{" "}
                <a href="#" className="font-medium underline hover:text-gray-700">
                  {News.by}
                </a>
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <strong className={` ${News.type == "1" ? "bg-green-600" : "bg-red-600"} -mb-[2px] -me-[2px] inline-flex items-center gap-1 rounded-ee-xl rounded-ss-xl  px-3 py-1.5 text-white `}>
            <svg xmlns="http://www.w3.org/2000/svg" className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
              />
            </svg>

            <span className="text-[10px] font-medium sm:text-xs">{News.type == "1" ? "Farmer" : "Market"}</span>
          </strong>
        </div>
      </article>
    </>
  );
};

export default Newsarticle;
