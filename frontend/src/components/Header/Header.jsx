import React from 'react';
import heroImg from './heroImg.jpg';
import { FaBuilding, FaSuitcase, FaUsers, FaUserPlus } from "react-icons/fa";

const Header = () => {
  const details = [
    {
      id: 1,
      title: "1,23,441",
      subTitle: "Live Job",
      icon: <FaSuitcase />,
    },
    {
      id: 2,
      title: "91220",
      subTitle: "Companies",
      icon: <FaBuilding />,
    },
    {
      id: 3,
      title: "2,34,200",
      subTitle: "Job Seekers",
      icon: <FaUsers />,
    },
    {
      id: 4,
      title: "1,03,761",
      subTitle: "Employers",
      icon: <FaUserPlus />,
    },
  ];
  return (
    <>
      <div className="flex flex-col lg:flex-row items-center justify-between py-8 px-6 lg:px-20 bg-white">
        <div className="flex justify-center lg:w-[45%]">
          <img
            src={heroImg}
            alt="Hero"
            className="w-full h-[360px] max-w-lg lg:max-w-xl" //
          />
        </div>

        <div className="flex flex-col items-center lg:items-start lg:w-[55%] mt-8 lg:mt-0 lg:ml-10">
          <span className="px-4 py-2 rounded-full bg-gray-100 text-[#F83002] font-medium">
            No. 1 Website for Jobs and Internships
          </span>

          <h1 className="text-3xl lg:text-6xl font-bold text-center lg:text-left mt-5 leading-9">
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
      <div className="details flex justify-center mt-5">
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {details.map((element) => (
            <div
              className="card bg-white shadow-lg rounded-lg p-6 flex flex-col items-center text-center"
              key={element.id}
            >
              <div className="icon text-3xl text-blue-500 mb-4">{element.icon}</div>
              <div className="content">
                <p className="text-2xl font-semibold">{element.title}</p>
                <p className="text-gray-500">{element.subTitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Header;
