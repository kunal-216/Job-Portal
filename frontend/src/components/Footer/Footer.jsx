import { FaLinkedin, FaInstagramSquare, FaFacebook, FaTwitterSquare } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { useContextProvider } from '../../context/StoreContext';

const Footer = () => {

  const {token, candidateProfileData, recruiterProfileData} = useContextProvider();

  return (
    <footer className="bg-[#1F2937] text-white py-8 sticky">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-evenly xl:ml-36 text-center md:text-left">
          <div className="w-full md:w-1/4 mb-2 md:mb-0">
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="text-gray-400">
              <li className="mb-2"><Link to="/jobs" className="hover:underline">Browse Jobs</Link></li>
              <li className="mb-2"><Link to="/internships" className="hover:underline">Browse Internships</Link></li>
              <li className="mb-2"><Link to="/contact" className="hover:underline">Contact Us</Link></li>
            </ul>
          </div>

          <div className="w-full md:w-1/4 mb-2 md:mb-0">
            <h3 className="text-xl font-bold mb-4">Candidate Services</h3>
            <ul className="text-gray-400">
              <li className="mb-2"><Link to="/resume" className="hover:underline">See Resume</Link></li>
              <li className="mb-2"><Link to="/" className="hover:underline">Career Coaching</Link></li>
              <li className="mb-2">{candidateProfileData ? <><Link to="/profile" className="hover:underline">See Profile</Link></> : !token ? <Link to="/user" className="hover:underline">Sign Up</Link> : <Link to="/candidate" className="hover:underline">Candidate Login</Link>}</li>
            </ul>
          </div>

          <div className="w-full md:w-1/4 mb-2 md:mb-0">
            <h3 className="text-xl font-bold mb-4">Recruiter Services</h3>
            <ul className="text-gray-400">
              <li className="mb-2">{recruiterProfileData ? <><Link to="/post-opportunity" className="hover:underline">Post an Opportunity</Link></> : !token ? <Link to="/user" className="hover:underline">Post a Job</Link> : <Link to="/recruiter" className="hover:underline">Post a Job</Link>}</li>
              <li className="mb-2"><Link to="/" className="hover:underline">Search Candidates</Link></li>
              <li className="mb-2">{recruiterProfileData ? <><Link to="/profile" className="hover:underline">See Profile</Link></> : !token ? <Link to="/user" className="hover:underline">Sign Up</Link> : <Link to="/recruiter" className="hover:underline">Recruiter Login</Link>}</li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center lg:mt-8 border-t border-gray-800 pt-6">
          <div className="text-center text-gray-400">
            <p className="mb-2">1234 Job Bridge Avenue, Job City, 56789</p>
            <p className="mb-2">Phone: +91 123-456-7890</p>
            <p>Email: support@opportunet.com</p>
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

        <div className="lg:mt-8 md:mt-6 mt-4 text-[14px] sm:text-[14px] md:text-[16px] text-center text-gray-400">
          <p>&copy; 2024 OpportuNet. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
