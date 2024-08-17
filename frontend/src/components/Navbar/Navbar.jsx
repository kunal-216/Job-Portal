import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { FaUserCircle } from "react-icons/fa";

const Navbar = () => {

  const [menu,setMenu] = useState(false)

  return (
    <nav className='flex justify-between items-center p-4 bg-gray-800 text-white'>
      <div>
      </div>
      <div className='flex space-x-6'>
        <Link to="/" className='hover:text-gray-400'>Home</Link>
        <Link to="/jobs" className='hover:text-gray-400'>Jobs</Link>
        <Link to="/internships" className='hover:text-gray-400'>Internships</Link>
        <Link to="/contact" className='hover:text-gray-400'>Contact</Link>
        <Link to="/dashboard" className='hover:text-gray-400'>Dashboard</Link>
      </div>
      <div className='flex space-x-4'>
        <Link to="/profile" className='flex items-center'>
          <FaUserCircle className='w-10 h-10 rounded-full' />
        </Link>
        <Link to="/signup" className='bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded'>Sign Up</Link>
      </div>
    </nav>
  )
}

export default Navbar
