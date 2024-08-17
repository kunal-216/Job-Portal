import React from 'react'
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className='flex justify-between items-center p-4 bg-gray-800 text-white'>
      <div>
      </div>
      <div className='flex space-x-6'>
        <Link to="/" className='hover:text-gray-400'>Home</Link>
        <Link to="/jobs" className='hover:text-gray-400'>Jobs</Link>
        <Link to="/about" className='hover:text-gray-400'>About Us</Link>
        <Link to="/contact" className='hover:text-gray-400'>Contact</Link>
      </div>
      <div className='flex space-x-4'>
        <Link to="/profile" className='flex items-center'>
          <img src="/path-to-profile-icon" alt="Profile" className='w-8 h-8 rounded-full' />
        </Link>
        <Link to="/apply" className='bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded'>Apply</Link>
      </div>
    </nav>
  )
}

export default Navbar
