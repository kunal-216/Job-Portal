import React, { useState } from 'react'
import { FaBookmark, FaGoogle } from "react-icons/fa";
import { CiBookmark } from "react-icons/ci"

const Internship = () => {

  const [bookmark, setBookmark] = useState("true");

  return (
    <div className='p-6 rounded-lg shadow-lg border border-gray-200 transition-transform transform hover:scale-105'>
      <div className='flex items-center justify-between mb-4'>
        <p className='text-sm text-gray-600'>2 days ago</p>
        <button className='rounded-full p-2 hover:bg-gray-300' onClick={() => setBookmark(prev => !prev)}>
          {bookmark ? <FaBookmark className='w-5 h-5 text-purple-700' /> : <CiBookmark className='w-5 h-5' />}
        </button>
      </div>

      <div className='flex items-center justify-center mb-4'>
        <FaGoogle className='w-8 h-8' />
      </div>

      <div className='text-center mb-4'>
        <h2 className='font-semibold text-2xl'>CompanyName</h2>
        <p className='text-sm text-gray-500'>Location</p>
      </div>

      <div className='mb-6'>
        <h1 className='font-bold text-xl text-blue-700'>Job Title</h1>
        <p className='text-sm text-gray-600'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod, iste!</p>
      </div>

      <div className='flex items-center gap-2 mt-4'>
        <span className="px-4 py-2 rounded-full bg-teal-500 text-white text-sm font-medium">Full-time</span>
        <span className="px-4 py-2 rounded-full bg-indigo-500 text-white text-sm font-medium">₹40,000 - ₹60,000</span>
      </div>

      <div className='flex items-center justify-between mt-6'>
        <button className='text-sm text-blue-500 hover:text-blue-700 hover:underline'>Details</button>
        <button className='text-sm text-pink-500 hover:text-pink-700 hover:underline'>Save for later</button>
      </div>
    </div>
  )
}

export default Internship
