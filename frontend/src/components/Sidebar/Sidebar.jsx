import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { MdOutlineDashboard, MdOutlinePostAdd, MdMenu, MdClose } from "react-icons/md";
import { FaUser, FaUserCog, FaList, FaBookmark } from "react-icons/fa";
import { IoIosDocument } from "react-icons/io";
import { IoKeySharp } from "react-icons/io5";
import { useContextProvider } from '../../context/StoreContext';

const Sidebar = () => {
    const { profileData, userDesignation } = useContextProvider();
    const hasProfileData = profileData && profileData.designation;
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => setIsOpen(!isOpen);

    return (
        <>
            <button
                className={`fixed bottom-4 left-4 z-20 md:hidden ${isOpen ? 'bg-red-500': 'bg-blue-500'} text-white p-2 rounded-md`}
                onClick={toggleSidebar}
            >
                {isOpen ? <MdClose size={24} /> : <MdMenu size={24} />}
            </button>
            <div className={`fixed inset-y-0 left-0 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 transition duration-200 ease-in-out md:w-[18%] sm:w-64 w-44 min-h-screen bg-blue-500 shadow-lg z-10`}>
                <div className='pt-12 pl-4 flex flex-col gap-5'>
                    <NavLink to='/dashboard' className={({ isActive }) => `flex items-center gap-3 border-l-4 pl-3 pr-2 py-2 rounded-r-md cursor-pointer transition-colors duration-200 ease-in-out ${isActive ? 'bg-blue-700 border-blue-400 shadow-md' : 'border-transparent hover:bg-blue-700 hover:border-blue-400'}`}>
                        <MdOutlineDashboard size={20} />
                        <p className='text-xs sm:text-sm md:text-base font-medium text-gray-100'>Dashboard</p>
                    </NavLink>
                    <NavLink to='/profile' className={({ isActive }) => `flex items-center gap-3 border-l-4 pl-3 pr-2 py-2 rounded-r-md cursor-pointer transition-colors duration-200 ease-in-out ${isActive ? 'bg-blue-700 border-blue-400 shadow-md' : 'border-transparent hover:bg-blue-700 hover:border-blue-400'}`}>
                        <FaUser size={20} />
                        <p className='text-xs sm:text-sm md:text-base font-medium text-gray-100'>Profile</p>
                    </NavLink>
                    <NavLink to='/update-profile' className={({ isActive }) => `flex items-center gap-3 border-l-4 pl-3 pr-2 py-2 rounded-r-md cursor-pointer transition-colors duration-200 ease-in-out ${isActive ? 'bg-blue-700 border-blue-400 shadow-md' : 'border-transparent hover:bg-blue-700 hover:border-blue-400'}`}>
                        <FaUserCog size={20} />
                        <p className='text-xs sm:text-sm md:text-base font-medium text-gray-100'>Update Profile</p>
                    </NavLink>
                    
                    {hasProfileData && userDesignation === "Candidate" && (
                        <>
                            <NavLink to='/my-applications' className={({ isActive }) => `flex items-center gap-3 border-l-4 pl-3 pr-2 py-2 rounded-r-md cursor-pointer transition-colors duration-200 ease-in-out ${isActive ? 'bg-blue-700 border-blue-400 shadow-md' : 'border-transparent hover:bg-blue-700 hover:border-blue-400'}`}>
                                <FaList size={20} />
                                <p className='text-xs sm:text-sm md:text-base font-medium text-gray-100'>My Applications</p>
                            </NavLink>
                            <NavLink to='/resume' className={({ isActive }) => `flex items-center gap-3 border-l-4 pl-3 pr-2 py-2 rounded-r-md cursor-pointer transition-colors duration-200 ease-in-out ${isActive ? 'bg-blue-700 border-blue-400 shadow-md' : 'border-transparent hover:bg-blue-700 hover:border-blue-400'}`}>
                                <IoIosDocument size={20} />
                                <p className='text-xs sm:text-sm md:text-base font-medium text-gray-100'>Resume</p>
                            </NavLink>
                            <NavLink to='/bookmarks' className={({ isActive }) => `flex items-center gap-3 border-l-4 pl-3 pr-2 py-2 rounded-r-md cursor-pointer transition-colors duration-200 ease-in-out ${isActive ? 'bg-blue-700 border-blue-400 shadow-md' : 'border-transparent hover:bg-blue-700 hover:border-blue-400'}`}>
                                <FaBookmark size={17} />
                                <p className='text-xs sm:text-sm md:text-base font-medium text-gray-100'>Bookmarks</p>
                            </NavLink>
                        </>
                    )}
                    {hasProfileData && userDesignation === "Recruiter" && (
                        <>
                            <NavLink to='/post-opportunity' className={({ isActive }) => `flex items-center gap-3 border-l-4 pl-3 pr-2 py-2 rounded-r-md cursor-pointer transition-colors duration-200 ease-in-out ${isActive ? 'bg-blue-700 border-blue-400 shadow-md' : 'border-transparent hover:bg-blue-700 hover:border-blue-400'}`}>
                                <MdOutlinePostAdd size={20} />
                                <p className='text-xs sm:text-sm md:text-base font-medium text-gray-100'>Post an Opportunity</p>
                            </NavLink>
                            <NavLink to='/opportunities-posted' className={({ isActive }) => `flex items-center gap-3 border-l-4 pl-3 pr-2 py-2 rounded-r-md cursor-pointer transition-colors duration-200 ease-in-out ${isActive ? 'bg-blue-700 border-blue-400 shadow-md' : 'border-transparent hover:bg-blue-700 hover:border-blue-400'}`}>
                                <IoKeySharp size={20} />
                                <p className='text-xs sm:text-sm md:text-base font-medium text-gray-100'>Opportunities Posted</p>
                            </NavLink>
                        </>
                    )}
                </div>
            </div>
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black opacity-50 z-0 md:hidden"
                    onClick={toggleSidebar}
                />
            )}
        </>
    );
};

export default Sidebar;