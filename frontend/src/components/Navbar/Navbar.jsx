import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaUserCircle } from "react-icons/fa";
import { toast } from 'react-toastify';
import { useContextProvider } from '../../context/StoreContext';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);
  const { token, setToken, url, userDesignation, candidateProfileData, recruiterProfileData } = useContextProvider();
  const navigate = useNavigate();

  const LogoutHandler = () => {
    try {
      localStorage.removeItem("token");
      setToken("");
      navigate("/");
      toast.success('Successfully logged out!');
    } catch (error) {
      toast.error(error.message || 'Logout failed. Please try again.');
    }
  };

  const handleProfileClick = () => {
    if (token) {
      navigate('/dashboard'); 
    }
  };

  return (
    <nav className='flex justify-between items-center p-4 bg-gray-800 text-white h-[64px]'>
      <div>
        <Link to="/"><h1 className='text-[30px] font-bold text-white ml-5 mb-2'>Opportu<span className='text-[#7ca6fb]'>Net</span></h1></Link>
      </div>
      <div className='flex space-x-6 mr-12'>
        <Link to="/" className='hover:text-gray-400 text-[16px]'>Home</Link>
        <Link to="/jobs" className='hover:text-gray-400 text-[16px]'>Jobs</Link>
        <Link to="/internships" className='hover:text-gray-400 text-[16px]'>Internships</Link>
        <Link to="/contact" className='hover:text-gray-400 text-[16px]'>Contact Us</Link>
      </div>
      <div className='relative flex space-x-4'>
        {token ?
          <>
            <div 
              className='relative flex items-center'
              onMouseEnter={() => setIsTooltipVisible(true)}
              onMouseLeave={() => setIsTooltipVisible(false)}
              onClick={handleProfileClick}
            >
              {userDesignation === "Candidate" ?
                candidateProfileData?.image ? (
                  <img
                    src={`${url}/images/${candidateProfileData.image}`}
                    alt='Profile'
                    className='rounded-full w-8 h-8 object-cover cursor-pointer'
                  />
                ) : (
                  <FaUserCircle className='w-8 h-8 rounded-full cursor-pointer' />
                )
                :
                recruiterProfileData?.image ? (
                  <img
                    src={`${url}/images/${recruiterProfileData.image}`}
                    alt='Profile'
                    className='rounded-full w-8 h-8 object-cover cursor-pointer'
                  />
                ) : (
                  <FaUserCircle className='w-8 h-8 rounded-full cursor-pointer' />
                )
              }
              {isTooltipVisible && (
                <div className='absolute top-full right-0 mt-2 bg-blue-600 text-white text-md px-3 py-1 rounded-lg'>
                  Dashboard
                </div>
              )}
            </div>
            <button onClick={LogoutHandler} className='bg-blue-500 hover:bg-blue-600 text-[14px] text-white py-2 px-4 rounded'>Logout</button>
          </>
          :
          <>
            <Link to="/user" className='flex items-center'>
              <FaUserCircle className='w-8 h-8 rounded-full' />
            </Link>
            <Link to="/user" className='bg-blue-500 hover:bg-blue-600 text-[14px] text-white py-2 px-4 rounded'>Sign Up</Link>
          </>
        }
      </div>
    </nav>
  );
};

export default Navbar;
