import React from 'react'
import { NavLink } from 'react-router-dom'
import { MdOutlineDashboard, MdOutlinePostAdd } from "react-icons/md";
import { FaUser, FaUserCog, FaList, FaBookmark } from "react-icons/fa";
import { IoIosDocument } from "react-icons/io";
import { IoKeySharp } from "react-icons/io5";

const Sidebar = () => {
    return (
        <div className='w-[18%] min-h-screen bg-blue-500 border-r border-white shadow-lg'>
            <div className='pt-12 pl-4 flex flex-col gap-5'>
                <NavLink to='/dashboard' className='flex items-center gap-3 border-l-4 border-transparent pl-3 pr-2 py-2 rounded-r-md cursor-pointer hover:bg-blue-700 hover:border-blue-400 transition-colors duration-200 ease-in-out' activeClassName='bg-blue-700 border-blue-400 shadow-md'>
                    <MdOutlineDashboard size={20} />
                    <p className='text-base font-medium text-gray-100'>Dashboard</p>
                </NavLink>
                <NavLink to='/profile' className='flex items-center gap-3 border-l-4 border-transparent pl-3 pr-2 py-2 rounded-r-md cursor-pointer hover:bg-blue-700 hover:border-blue-400 transition-colors duration-200 ease-in-out' activeClassName='bg-blue-700 border-blue-400 shadow-md'>
                    <FaUser size={20} />
                    <p className='text-base font-medium text-gray-100'>Profile</p>
                </NavLink>
                <NavLink to='/update-profile' className='flex items-center gap-3 border-l-4 border-transparent pl-3 pr-2 py-2 rounded-r-md cursor-pointer hover:bg-blue-700 hover:border-blue-400 transition-colors duration-200 ease-in-out' activeClassName='bg-blue-700 border-blue-400 shadow-md'>
                    <FaUserCog size={20} />
                    <p className='text-base font-medium text-gray-100'>Update Profile</p>
                </NavLink>
                <NavLink to='/my-applications' className='flex items-center gap-3 border-l-4 border-transparent pl-3 pr-2 py-2 rounded-r-md cursor-pointer hover:bg-blue-700 hover:border-blue-400 transition-colors duration-200 ease-in-out' activeClassName='bg-blue-700 border-blue-400 shadow-md'>
                    <FaList size={20} />
                    <p className='text-base font-medium text-gray-100'>My Applications</p>
                </NavLink>
                <NavLink to='/resume' className='flex items-center gap-3 border-l-4 border-transparent pl-3 pr-2 py-2 rounded-r-md cursor-pointer hover:bg-blue-700 hover:border-blue-400 transition-colors duration-200 ease-in-out' activeClassName='bg-blue-700 border-blue-400 shadow-md'>
                    <IoIosDocument size={20} />
                    <p className='text-base font-medium text-gray-100'>Resume</p>
                </NavLink>
                <NavLink to='/bookmarked' className='flex items-center gap-3 border-l-4 border-transparent pl-3 pr-2 py-2 rounded-r-md cursor-pointer hover:bg-blue-700 hover:border-blue-400 transition-colors duration-200 ease-in-out' activeClassName='bg-blue-700 border-blue-400 shadow-md'>
                    <FaBookmark size={17} />
                    <p className='text-base font-medium text-gray-100'>Bookmarked</p>
                </NavLink>
                <NavLink to='/post-opportunity' className='flex items-center gap-3 border-l-4 border-transparent pl-3 pr-2 py-2 rounded-r-md cursor-pointer hover:bg-blue-700 hover:border-blue-400 transition-colors duration-200 ease-in-out' activeClassName='bg-blue-700 border-blue-400 shadow-md'>
                    <MdOutlinePostAdd size={20} />
                    <p className='text-base font-medium text-gray-100'>Post an Opportunity</p>
                </NavLink>
                <NavLink to='/opportunities-posted' className='flex items-center gap-3 border-l-4 border-transparent pl-3 pr-2 py-2 rounded-r-md cursor-pointer hover:bg-blue-700 hover:border-blue-400 transition-colors duration-200 ease-in-out' activeClassName='bg-blue-700 border-blue-400 shadow-md'>
                    <IoKeySharp size={20} />
                    <p className='text-base font-medium text-gray-100'>Opportunities Posted</p>
                </NavLink>
            </div>
        </div>
    )
}

export default Sidebar

