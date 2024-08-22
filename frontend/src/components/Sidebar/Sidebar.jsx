import React from 'react'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
    return (
        <div className='w-[18%] min-h-screen bg-blue-500 border-r border-white shadow-lg'>
            <div className='pt-12 pl-4 flex flex-col gap-5'>
                <NavLink to='/profile' className='flex items-center gap-3 border-l-4 border-transparent pl-3 pr-2 py-2 rounded-r-md cursor-pointer hover:bg-blue-700 hover:border-blue-400 transition-colors duration-200 ease-in-out' activeClassName='bg-blue-700 border-blue-400 shadow-md'>
                    {/* <img src={assets.add_icon} /> */}
                    <p className='text-base font-medium text-gray-100'>Profile</p>
                </NavLink>
                <NavLink to='/update-profile' className='flex items-center gap-3 border-l-4 border-transparent pl-3 pr-2 py-2 rounded-r-md cursor-pointer hover:bg-blue-700 hover:border-blue-400 transition-colors duration-200 ease-in-out' activeClassName='bg-blue-700 border-blue-400 shadow-md'>
                    <p className='text-base font-medium text-gray-100'>Update Profile</p>
                </NavLink>
                <NavLink to='/my-applications' className='flex items-center gap-3 border-l-4 border-transparent pl-3 pr-2 py-2 rounded-r-md cursor-pointer hover:bg-blue-700 hover:border-blue-400 transition-colors duration-200 ease-in-out' activeClassName='bg-blue-700 border-blue-400 shadow-md'>
                    <p className='text-base font-medium text-gray-100'>My Applications</p>
                </NavLink>
                <NavLink to='/resume' className='flex items-center gap-3 border-l-4 border-transparent pl-3 pr-2 py-2 rounded-r-md cursor-pointer hover:bg-blue-700 hover:border-blue-400 transition-colors duration-200 ease-in-out' activeClassName='bg-blue-700 border-blue-400 shadow-md'>
                    <p className='text-base font-medium text-gray-100'>Resume</p>
                </NavLink>
                <NavLink to='/post-job' className='flex items-center gap-3 border-l-4 border-transparent pl-3 pr-2 py-2 rounded-r-md cursor-pointer hover:bg-blue-700 hover:border-blue-400 transition-colors duration-200 ease-in-out' activeClassName='bg-blue-700 border-blue-400 shadow-md'>
                    <p className='text-base font-medium text-gray-100'>Post A Job</p>
                </NavLink>
            </div>
        </div>
    )
}

export default Sidebar

