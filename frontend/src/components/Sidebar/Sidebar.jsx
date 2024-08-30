import { NavLink } from 'react-router-dom';
import { MdOutlineDashboard, MdOutlinePostAdd } from "react-icons/md";
import { FaUser, FaUserCog, FaList, FaBookmark } from "react-icons/fa";
import { IoIosDocument } from "react-icons/io";
import { IoKeySharp } from "react-icons/io5";
import { useContextProvider } from '../../context/StoreContext';

const Sidebar = () => {

    const { profileData } = useContextProvider();

    return (
        <div className='w-[18%] min-h-screen bg-blue-500 border-r border-white shadow-lg'>
            <div className='pt-12 pl-4 flex flex-col gap-5'>
                <NavLink to='/dashboard' className={({ isActive }) => `flex items-center gap-3 border-l-4 pl-3 pr-2 py-2 rounded-r-md cursor-pointer transition-colors duration-200 ease-in-out ${isActive ? 'bg-blue-700 border-blue-400 shadow-md' : 'border-transparent hover:bg-blue-700 hover:border-blue-400'}`}>
                    <MdOutlineDashboard size={20} />
                    <p className='text-base font-medium text-gray-100'>Dashboard</p>
                </NavLink>
                <NavLink to='/profile' className={({ isActive }) => `flex items-center gap-3 border-l-4 pl-3 pr-2 py-2 rounded-r-md cursor-pointer transition-colors duration-200 ease-in-out ${isActive ? 'bg-blue-700 border-blue-400 shadow-md' : 'border-transparent hover:bg-blue-700 hover:border-blue-400'}`}>
                    <FaUser size={20} />
                    <p className='text-base font-medium text-gray-100'>Profile</p>
                </NavLink>
                <NavLink to='/update-profile' className={({ isActive }) => `flex items-center gap-3 border-l-4 pl-3 pr-2 py-2 rounded-r-md cursor-pointer transition-colors duration-200 ease-in-out ${isActive ? 'bg-blue-700 border-blue-400 shadow-md' : 'border-transparent hover:bg-blue-700 hover:border-blue-400'}`}>
                    <FaUserCog size={20} />
                    <p className='text-base font-medium text-gray-100'>Update Profile</p>
                </NavLink>
                {profileData.designation === "Candidate" ?
                    <>
                        <NavLink to='/my-applications' className={({ isActive }) => `flex items-center gap-3 border-l-4 pl-3 pr-2 py-2 rounded-r-md cursor-pointer transition-colors duration-200 ease-in-out ${isActive ? 'bg-blue-700 border-blue-400 shadow-md' : 'border-transparent hover:bg-blue-700 hover-border-blue-400'}`}>
                            <FaList size={20} />
                            <p className='text-base font-medium text-gray-100'>My Applications</p>
                        </NavLink>
                        <NavLink to='/resume' className={({ isActive }) => `flex items-center gap-3 border-l-4 pl-3 pr-2 py-2 rounded-r-md cursor-pointer transition-colors duration-200 ease-in-out ${isActive ? 'bg-blue-700 border-blue-400 shadow-md' : 'border-transparent hover:bg-blue-700 hover:border-blue-400'}`}>
                            <IoIosDocument size={20} />
                            <p className='text-base font-medium text-gray-100'>Resume</p>
                        </NavLink>
                        <NavLink to='/bookmarks' className={({ isActive }) => `flex items-center gap-3 border-l-4 pl-3 pr-2 py-2 rounded-r-md cursor-pointer transition-colors duration-200 ease-in-out ${isActive ? 'bg-blue-700 border-blue-400 shadow-md' : 'border-transparent hover:bg-blue-700 hover:border-blue-400'}`}>
                            <FaBookmark size={17} />
                            <p className='text-base font-medium text-gray-100'>Bookmarks</p>
                        </NavLink>
                    </> : <></>
                }
                {profileData.designation === "Recruiter" ?
                    <>
                        <NavLink to='/post-opportunity' className={({ isActive }) => `flex items-center gap-3 border-l-4 pl-3 pr-2 py-2 rounded-r-md cursor-pointer transition-colors duration-200 ease-in-out ${isActive ? 'bg-blue-700 border-blue-400 shadow-md' : 'border-transparent hover:bg-blue-700 hover:border-blue-400'}`}>
                            <MdOutlinePostAdd size={20} />
                            <p className='text-base font-medium text-gray-100'>Post an Opportunity</p>
                        </NavLink>
                        <NavLink to='/opportunities-posted' className={({ isActive }) => `flex items-center gap-3 border-l-4 pl-3 pr-2 py-2 rounded-r-md cursor-pointer transition-colors duration-200 ease-in-out ${isActive ? 'bg-blue-700 border-blue-400 shadow-md' : 'border-transparent hover:bg-blue-700 hover:border-blue-400'}`}>
                            <IoKeySharp size={20} />
                            <p className='text-base font-medium text-gray-100'>Opportunities Posted</p>
                        </NavLink>
                    </> : <></>} 
               
                {/* <NavLink to='/my-applications' className={({ isActive }) => `flex items-center gap-3 border-l-4 pl-3 pr-2 py-2 rounded-r-md cursor-pointer transition-colors duration-200 ease-in-out ${isActive ? 'bg-blue-700 border-blue-400 shadow-md' : 'border-transparent hover:bg-blue-700 hover-border-blue-400'}`}>
                    <FaList size={20} />
                    <p className='text-base font-medium text-gray-100'>My Applications</p>
                </NavLink>
                <NavLink to='/resume' className={({ isActive }) => `flex items-center gap-3 border-l-4 pl-3 pr-2 py-2 rounded-r-md cursor-pointer transition-colors duration-200 ease-in-out ${isActive ? 'bg-blue-700 border-blue-400 shadow-md' : 'border-transparent hover:bg-blue-700 hover:border-blue-400'}`}>
                    <IoIosDocument size={20} />
                    <p className='text-base font-medium text-gray-100'>Resume</p>
                </NavLink>
                <NavLink to='/bookmarks' className={({ isActive }) => `flex items-center gap-3 border-l-4 pl-3 pr-2 py-2 rounded-r-md cursor-pointer transition-colors duration-200 ease-in-out ${isActive ? 'bg-blue-700 border-blue-400 shadow-md' : 'border-transparent hover:bg-blue-700 hover:border-blue-400'}`}>
                    <FaBookmark size={17} />
                    <p className='text-base font-medium text-gray-100'>Bookmarks</p>
                </NavLink>
                <NavLink to='/post-opportunity' className={({ isActive }) => `flex items-center gap-3 border-l-4 pl-3 pr-2 py-2 rounded-r-md cursor-pointer transition-colors duration-200 ease-in-out ${isActive ? 'bg-blue-700 border-blue-400 shadow-md' : 'border-transparent hover:bg-blue-700 hover:border-blue-400'}`}>
                    <MdOutlinePostAdd size={20} />
                    <p className='text-base font-medium text-gray-100'>Post an Opportunity</p>
                </NavLink>
                <NavLink to='/opportunities-posted' className={({ isActive }) => `flex items-center gap-3 border-l-4 pl-3 pr-2 py-2 rounded-r-md cursor-pointer transition-colors duration-200 ease-in-out ${isActive ? 'bg-blue-700 border-blue-400 shadow-md' : 'border-transparent hover:bg-blue-700 hover:border-blue-400'}`}>
                    <IoKeySharp size={20} />
                    <p className='text-base font-medium text-gray-100'>Opportunities Posted</p>
                </NavLink> */}
            </div>
        </div>
    );
};

export default Sidebar;
