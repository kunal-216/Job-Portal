import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { FaUserCircle } from "react-icons/fa";

const Navbar = () => {

  const [menu,setMenu] = useState('home');
  const token = true;

  return (
    <nav className='flex justify-between items-center p-4 bg-gray-800 text-white'>
      <div>
        <Link to="/"><img src="" alt="Logo" /></Link>
      </div>
      <div className='flex space-x-6'>
        <Link to="/" onClick={()=>setMenu("Home")} className={menu==="Home"? 'hover:text-gray-400 underline underline-offset-4 decoration-blue-200' : 'hover:text-gray-400'}>Home</Link>
        <Link to="/jobs" onClick={()=>setMenu("Jobs")} className={menu==="Jobs"? 'hover:text-gray-400 underline underline-offset-4 decoration-blue-200' : 'hover:text-gray-400'}>Jobs</Link>
        <Link to="/internships" onClick={()=>setMenu("Internships")} className={menu==="Internships"? 'hover:text-gray-400 underline underline-offset-4 decoration-blue-200' : 'hover:text-gray-400'}>Internships</Link>
        <Link to="/connect" onClick={()=>setMenu("Connect")} className={menu==="Connect"? 'hover:text-gray-400 underline underline-offset-4 decoration-blue-200' : 'hover:text-gray-400'}>Connect</Link>
        <Link to="/contact" onClick={()=>setMenu("Contact")} className={menu==="Contact"? 'hover:text-gray-400 underline underline-offset-4 decoration-blue-200' : 'hover:text-gray-400'}>Contact Us</Link>
      </div>
      <div className='flex space-x-4'>
        <Link to="/dashboard" className='flex items-center'>
          <FaUserCircle className='w-10 h-10 rounded-full' />
        </Link>
        {token ? <Link to="/user" onClick={()=>setMenu("Sign Up")} className='bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded'>Sign Up</Link> : <></>}
      </div>
    </nav>
  )
}

export default Navbar
