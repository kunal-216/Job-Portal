import { FaLinkedin, FaInstagramSquare, FaFacebook, FaTwitterSquare } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { useContextProvider } from '../../context/StoreContext';

const Footer = () => {
  const { token, candidateProfileData, recruiterProfileData } = useContextProvider();

  return (
    <footer className="bg-[#1F2937] text-white py-4 sm:py-6 text-sm sm:text-base">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
          <div className="mx-auto flex flex-col">
            <h3 className="text-lg font-bold mb-2 text-center">Quick Links</h3>
            <ul className="text-gray-400 space-y-1 flex flex-col items-center">
              <li><Link to="/jobs" className="hover:underline">Browse Jobs</Link></li>
              <li><Link to="/internships" className="hover:underline">Browse Internships</Link></li>
              <li><Link to="/contact" className="hover:underline">Contact Us</Link></li>
            </ul>
          </div>

          <div className="mx-auto flex flex-col">
            <h3 className="text-lg font-bold mb-2">Candidate Services</h3>
            <ul className="text-gray-400 space-y-1 flex flex-col items-center">
              <li>{candidateProfileData ? <Link to="/resume" className="hover:underline">See Resume</Link> : !token ? <Link to="/user" className="hover:underline">Sign Up</Link> : <Link to="/candidate" className="hover:underline">Candidate Login</Link>}</li>
              <li><Link to="/" className="hover:underline">Career Coaching</Link></li>
              <li>{candidateProfileData ? <Link to="/profile" className="hover:underline">See Profile</Link> : !token ? <Link to="/user" className="hover:underline">Sign Up</Link> : <Link to="/candidate" className="hover:underline">Candidate Login</Link>}</li>
            </ul>
          </div>

          <div className="mx-auto flex flex-col">
            <h3 className="text-lg font-bold mb-2">Recruiter Services</h3>
            <ul className="text-gray-400 space-y-1 flex flex-col items-center">
              <li>{recruiterProfileData ? <Link to="/post-opportunity" className="hover:underline">Post an Opportunity</Link> : !token ? <Link to="/user" className="hover:underline">Post a Job</Link> : <Link to="/recruiter" className="hover:underline">Post a Job</Link>}</li>
              <li><Link to="/" className="hover:underline">Search Candidates</Link></li>
              <li>{recruiterProfileData ? <Link to="/profile" className="hover:underline">See Profile</Link> : !token ? <Link to="/user" className="hover:underline">Sign Up</Link> : <Link to="/recruiter" className="hover:underline">Recruiter Login</Link>}</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-4 flex flex-col items-center">
          <div className="text-gray-400 text-xs sm:text-sm text-center mb-2">
            <p>1234 Job Bridge Avenue, Job City, 56789</p>
            <p>Phone: +91 123-456-7890 | Email: support@opportunet.com</p>
          </div>

          <div className="flex space-x-4 mb-2">
            <a href="https://facebook.com" className="text-gray-400 hover:text-white"><FaFacebook className='h-5 w-5' /></a>
            <a href="https://twitter.com" className="text-gray-400 hover:text-white"><FaTwitterSquare className='h-5 w-5' /></a>
            <a href="https://linkedin.com" className="text-gray-400 hover:text-white"><FaLinkedin className='h-5 w-5' /></a>
            <a href="https://instagram.com" className="text-gray-400 hover:text-white"><FaInstagramSquare className='h-5 w-5' /></a>
          </div>

          <div className="text-xs text-center text-gray-400">
            <p>&copy; 2024 OpportuNet. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;