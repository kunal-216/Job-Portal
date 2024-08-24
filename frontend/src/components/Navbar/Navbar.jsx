import React from 'react';
import { Link } from 'react-router-dom';
import { FaUserCircle } from "react-icons/fa";
import logo from "./logo.png";
import { toast } from 'react-toastify';
import { useContextProvider } from '../../context/StoreContext';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {

  const { token, setToken, profileData, url } = useContextProvider();
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

  return (
    <nav className='flex justify-between items-center p-4 bg-gray-800 text-white h-[80px]'>
      <div>
        <Link to="/"><img src={logo} alt="Logo" className='h-9 text-white' /></Link>
      </div>
      <div className='flex space-x-6'>
        <Link to="/" className='hover:text-gray-400'>Home</Link>
        <Link to="/jobs" className='hover:text-gray-400'>Jobs</Link>
        <Link to="/internships" className='hover:text-gray-400'>Internships</Link>
        <Link to="/connect" className='hover:text-gray-400'>Connect</Link>
        <Link to="/contact" className='hover:text-gray-400'>Contact Us</Link>
      </div>
      <div className='flex space-x-4'>
        {token ?
          <>
            <Link to="/dashboard" className='flex items-center'>
              {profileData?.image ? (
                <img
                  src={`${url}/images/${profileData.image}`}
                  alt='Profile'
                  className='rounded-full w-8 h-8 object-cover'
                />
              ) : (
                <FaUserCircle className='w-8 h-8 rounded-full' />
              )}
            </Link>
            <button onClick={LogoutHandler} className='bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded'>Logout</button>
          </>
          :
          <>
            <Link to="/user" className='flex items-center'>
              <FaUserCircle className='w-8 h-8 rounded-full' />
            </Link>
            <Link to="/user" className='bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded'>Sign Up</Link>
          </>}
      </div>
    </nav>
  );
};

export default Navbar;
