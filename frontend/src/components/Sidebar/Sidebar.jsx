import React from 'react'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
    return (
        <div className='w-[18%] min-h-screen bg-gray-500 border-l border-gray-300 shadow-lg'>
            <div className='pt-12 pl-4 flex flex-col gap-5'>
                <NavLink to='/profile' className='flex items-center gap-3 border-l-4 border-transparent pl-3 pr-2 py-2 rounded-r-md cursor-pointer hover:bg-white hover:border-tomato transition-colors duration-200 ease-in-out' activeClassName='bg-white border-tomato shadow-md'>
                    {/* <img src={assets.add_icon} /> */}
                    <p className='text-base font-medium text-gray-700'>Profile</p>
                </NavLink>
                <NavLink to='/update-profile' className='flex items-center gap-3 border-l-4 border-transparent pl-3 pr-2 py-2 rounded-r-md cursor-pointer hover:bg-white hover:border-tomato transition-colors duration-200 ease-in-out' activeClassName='bg-white border-tomato shadow-md'>
                    <p className='text-base font-medium text-gray-700'>Update Profile</p>
                </NavLink>
                <NavLink to='/my-applications' className='flex items-center gap-3 border-l-4 border-transparent pl-3 pr-2 py-2 rounded-r-md cursor-pointer hover:bg-white hover:border-tomato transition-colors duration-200 ease-in-out' activeClassName='bg-white border-tomato shadow-md'>
                    <p className='text-base font-medium text-gray-700'>My Applications</p>
                </NavLink>
            </div>
        </div>
    )
}

export default Sidebar
