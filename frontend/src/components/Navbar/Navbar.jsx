import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaUserCircle, FaBars, FaTimes } from "react-icons/fa"; 
import { toast } from 'react-toastify';
import { useContextProvider } from '../../context/StoreContext';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); 
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
      if (userDesignation === "Candidate" && candidateProfileData) {
        navigate('/dashboard'); 
      } else if (userDesignation === "Recruiter" && recruiterProfileData) {
        navigate('/dashboard'); 
      } else {
        navigate(userDesignation === "Candidate" ? '/candidate' : '/recruiter');
      }
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen); 
  };

  return (
    <nav className='flex justify-between items-center p-4 bg-gray-800 text-white h-[64px]'>
      <div>
        <Link to="/"><h1 className='text-[28px] font-bold text-white md:ml-5 md:mb-2 mb-1 ml-3'>Opportu<span className='text-[#7ca6fb]'>Net</span></h1></Link>
      </div>

      <div className='hidden md:flex md:space-x-6'>
        <Link to="/" className='hover:text-gray-400 text-[16px]'>Home</Link>
        <Link to="/jobs" className='hover:text-gray-400 text-[16px]'>Jobs</Link>
        <Link to="/internships" className='hover:text-gray-400 text-[16px]'>Internships</Link>
        <Link to="/contact" className='hover:text-gray-400 text-[16px]'>Contact Us</Link>
      </div>

      <div className='flex items-center space-x-4'>
        {token ? (
          <>
            <div
              className='relative flex items-center'
              onMouseEnter={() => setIsTooltipVisible(true)}
              onMouseLeave={() => setIsTooltipVisible(false)}
              onClick={handleProfileClick}
            >
              {userDesignation === "Candidate" ? (
                candidateProfileData?.image ? (
                  <img
                    src={`${url}/images/${candidateProfileData.image}`}
                    alt='Profile'
                    className='rounded-full w-8 h-8 object-cover cursor-pointer'
                  />
                ) : (
                  <FaUserCircle className='w-8 h-8 rounded-full cursor-pointer' />
                )
              ) : recruiterProfileData?.image ? (
                <img
                  src={`${url}/images/${recruiterProfileData.image}`}
                  alt='Profile'
                  className='rounded-full w-8 h-8 object-cover cursor-pointer'
                />
              ) : (
                <FaUserCircle className='w-8 h-8 rounded-full cursor-pointer' />
              )}
              {isTooltipVisible && (
                <div className='absolute top-full right-0 mt-2 bg-blue-600 text-white text-md px-3 py-1 rounded-lg'>
                  Dashboard
                </div>
              )}
            </div>
            <button onClick={LogoutHandler} className='hidden md:block bg-blue-500 hover:bg-blue-600 text-[14px] text-white py-2 px-4 rounded'>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/user" className='hidden md:flex items-center'>
              <FaUserCircle className='w-8 h-8 rounded-full' />
            </Link>
            <Link to="/user" className='hidden md:block bg-blue-500 hover:bg-blue-600 text-[14px] text-white py-2 px-4 rounded'>
              Sign Up
            </Link>
          </>
        )}

        <div className='md:hidden'>
          <button onClick={toggleMenu}>
            {isMenuOpen ? <FaTimes className="text-2xl" /> : <FaBars className="text-2xl" />}
          </button>
        </div>
      </div>

      <div className={`fixed top-0 right-0 h-full bg-gray-800 p-4 sm:w-[150px] space-y-4 transition-transform transform ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'} md:hidden z-50`}>
        <div className='flex justify-end'>
          <button onClick={toggleMenu} className='text-white text-lg'>
            <FaTimes />
          </button>
        </div>

        <Link to="/" className='block text-14px sm:text-[16px] py-2 px-4 hover:bg-gray-700 rounded'>Home</Link>
        <Link to="/jobs" className='block text-14px sm:text-[16px] py-2 px-4 hover:bg-gray-700 rounded'>Jobs</Link>
        <Link to="/internships" className='block text-14px sm:text-[16px] py-2 px-4 hover:bg-gray-700 rounded'>Internships</Link>
        <Link to="/contact" className='block text-14px sm:text-[16px] py-2 px-4 hover:bg-gray-700 rounded'>Contact Us</Link>
        
        {token ? (
          <>
            <button onClick={LogoutHandler} className='block bg-blue-500 hover:bg-blue-600 sm:text-[16px] text-[14px] ml-3 text-white py-2 px-4 rounded'>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/user" className='block bg-blue-500 hover:bg-blue-600 sm:text-[16px] text-[14px] text-white ml-3 py-2 px-4 rounded'>Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
