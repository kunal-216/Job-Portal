import { Link } from 'react-router-dom';
import { FaUserCircle } from "react-icons/fa";
import { toast } from 'react-toastify';
import { useContextProvider } from '../../context/StoreContext';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
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

  return (
    <nav className='flex justify-between items-center p-4 bg-gray-800 text-white h-[80px]'>
      <div>
        <Link to="/"><h1 className='text-[35px] font-bold text-white ml-5 mb-2'>Opportu<span className='text-[#7ca6fb]'>Net</span></h1></Link>
      </div>
      <div className='flex space-x-6 mr-12'>
        <Link to="/" className='hover:text-gray-400 text-[18px]'>Home</Link>
        <Link to="/jobs" className='hover:text-gray-400 text-[18px]'>Jobs</Link>
        <Link to="/internships" className='hover:text-gray-400 text-[18px]'>Internships</Link>
        <Link to="/contact" className='hover:text-gray-400 text-[18px]'>Contact Us</Link>
      </div>
      <div className='flex space-x-4'>
        {token ?
          <>
            <Link to="/dashboard" className='flex items-center'>
              {userDesignation === "Candidate" ?
                candidateProfileData?.image ? (
                  <img
                    src={`${url}/images/${candidateProfileData.image}`}
                    alt='Profile'
                    className='rounded-full w-9 h-9 object-cover'
                  />
                ) : (
                  <FaUserCircle className='w-10 h-10 rounded-full' />
                )
                :
                recruiterProfileData?.image ? (
                  <img
                    src={`${url}/images/${recruiterProfileData.image}`}
                    alt='Profile'
                    className='rounded-full w-9 h-9 object-cover'
                  />
                ) : (
                  <FaUserCircle className='w-9 h-9 rounded-full' />
                )
              }
            </Link>
            <button onClick={LogoutHandler} className='bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded'>Logout</button>
          </>
          :
          <>
            <Link to="/user" className='flex items-center'>
              <FaUserCircle className='w-9 h-9 rounded-full' />
            </Link>
            <Link to="/user" className='bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded'>Sign Up</Link>
          </>
        }
      </div>
    </nav>
  );
};

export default Navbar;
