import React from 'react';
import { FaLinkedin, FaInstagramSquare, FaFacebook, FaTwitterSquare } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { useContextProvider } from '../../context/StoreContext';

const Footer = () => {

  const {token} = useContextProvider();

  return (
    <footer className="bg-[#1F2937] text-white py-8 sticky">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between ml-40 text-center md:text-left">
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="text-gray-400">
              <li className="mb-2"><Link to="/jobs" className="hover:underline">Browse Jobs</Link></li>
              <li className="mb-2"><Link to="/internships" className="hover:underline">Browse Internships</Link></li>
              <li className="mb-2"><Link to="/contact" className="hover:underline">Contact Us</Link></li>
            </ul>
          </div>

          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h3 className="text-xl font-bold mb-4">Candidate Services</h3>
            <ul className="text-gray-400">
              <li className="mb-2"><Link to="/resume" className="hover:underline">Resume Writing</Link></li>
              <li className="mb-2"><Link to="/" className="hover:underline">Career Coaching</Link></li>
              <li className="mb-2"><Link to="/" className="hover:underline">Job Alerts</Link></li>
            </ul>
          </div>

          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h3 className="text-xl font-bold mb-4">Recruiter Services</h3>
            <ul className="text-gray-400">
              <li className="mb-2"><Link to="/post-opportunity" className="hover:underline">Post a Job</Link></li>
              <li className="mb-2"><Link to="/" className="hover:underline">Search Resumes</Link></li>
              <li className="mb-2">{token ? <><Link to="/profile" className="hover:underline">See Profile</Link></>: <Link to="/user" className="hover:underline">Recruiter Login</Link>}</li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center mt-8 border-t border-gray-800 pt-6">
          <div className="text-center text-gray-400">
            <p className="mb-2">1234 Job Bridge Avenue, Job City, 56789</p>
            <p className="mb-2">Phone: +91 123-456-7890</p>
            <p>Email: support@talentbridge.com</p>
          </div>

          <div className="text-center flex mt-7">
            <a href="https://facebook.com" className="text-gray-400 hover:text-white">
              <FaFacebook className='h-6 w-6 mx-2'/>
            </a>
            <a href="https://twitter.com" className="text-gray-400 hover:text-white">
              <FaTwitterSquare className='h-6 w-6 mx-2' />
            </a>
            <a href="https://linkedin.com" className="text-gray-400 hover:text-white">
              <FaLinkedin className='h-6 w-6 mx-2' />
            </a>
            <a href="https://instagram.com" className="text-gray-400 hover:text-white">
              <FaInstagramSquare className='h-6 w-6 mx-2' />
            </a>
          </div>
        </div>

        <div className="mt-8 text-center text-gray-400">
          <p>&copy; 2024 Talent Bridge. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
