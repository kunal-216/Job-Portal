import React from 'react'
import Cards from '../Cards/Cards'
import { FaMicrosoft, FaApple, FaGoogle } from "react-icons/fa"
import { SiMeta, SiTesla } from "react-icons/si"
import { Link } from "react-router-dom"

const LatestJobs = () => {

  const jobs = [
    {
      id: 1,
      companyName: "Microsoft",
      location: "Work from Home",
      jobTitle: "Software Developer",
      salary: "₹55,00,000",
      jobTimings: "Work from Home",
      icon: <FaMicrosoft />,
    },
    {
      id: 2,
      companyName: "Tesla",
      location: "Mumbai, India",
      jobTitle: "App Developer",
      salary: "₹33,00,000",
      jobTimings: "Full Time",
      icon: <SiTesla />,
    },
    {
      id: 3,
      companyName: "Apple",
      location: "Bangalore, India",
      jobTitle: "UI/UX Designer",
      salary: "₹34,00,000",
      jobTimings: "Part Time",
      icon: <FaApple />,
    },
    {
      id: 4,
      companyName: "Meta",
      location: "Jaipur, India",
      jobTitle: "Full Stack Developer",
      salary: "₹28,00,000",
      jobTimings: "Full Time",
      icon: <SiMeta />,
    },
    {
      id: 5,
      companyName: "Google",
      location: "Work from Home",
      jobTitle: "SEO Optimizer",
      salary: "₹25,00,000",
      jobTimings: "Work from Home",
      icon: <FaGoogle />,
    },
  ];

  return (
    <div className='max-w-7xl mx-auto my-20'>
      <h1 className='text-4xl font-bold text-center my-8'><span className='text-[#3B82F6]'>Latest & Top</span> Job Openings</h1>
      <div className='grid grid-cols-5 gap-3'>
        {
          jobs.slice(0, 5).map((item, index) => (
            <Cards key={index} companyName={item.companyName} location={item.location} jobTitle={item.jobTitle} salary={item.salary} icon={item.icon} jobTimings={item.jobTimings} />
          ))
        }
      </div>
      <div className='flex justify-center'>
        <Link to="/jobs" className="inline bg-blue-900 text-white px-4 py-2 text-sm font-medium rounded-md hover:bg-blue-600 transition-colors">
          Browse More Like These <span className="ml-2">→</span>
        </Link>
      </div>
    </div>
  )
}

export default LatestJobs
