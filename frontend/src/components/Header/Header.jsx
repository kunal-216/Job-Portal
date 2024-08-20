import React from 'react';
import heroImg from './heroImg.jpg';

const Header = () => {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-between py-8 px-6 lg:px-20 bg-white">
      <div className="flex justify-center lg:w-1/2">
        <img
          src={heroImg}
          alt="Hero"
          className="w-full h-[360px] max-w-lg lg:max-w-xl" //
        />
      </div>

      <div className="flex flex-col items-center lg:items-start lg:w-1/2 mt-8 lg:mt-0 lg:ml-10">
        <span className="px-4 py-2 rounded-full bg-gray-100 text-[#F83002] font-medium">
          No. 1 Website for Jobs and Internships
        </span>
        <h1 className="text-3xl lg:text-5xl font-bold text-center lg:text-left mt-5">
          Search, Apply, and Get Your <br />
          <span className="text-[#3B82F6]">Dream Job or Internship</span>
        </h1>
        <p className="text-center text-teal-700 lg:text-left mt-4 ml-1">
          Unlock Your Career Potential: Explore Top Categories and Land Your Dream Job Today!
        </p>

        <div className="flex w-full lg:w-[80%] mt-12 border border-gray-200 rounded-full items-center">
          <input
            type="text"
            placeholder="Find your dream jobs"
            className="outline-none border-none w-full py-3 px-6 rounded-l-full"
          />
          <button className="bg-[#3B82F6] hover:bg-[#3d75d0] px-6 py-2 rounded-r-full text-white font-medium">
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
