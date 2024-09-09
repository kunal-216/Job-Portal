import { useState } from 'react'
import { FaBookmark } from "react-icons/fa";
import { CiBookmark } from "react-icons/ci"
import { useContextProvider } from '../../context/StoreContext';
import { toast } from 'react-toastify';
import axios from 'axios';
import getTimeDifference from '../../utils/timeDifference';
import { Link } from 'react-router-dom';

const Internship = ({ company, companyLogo, internshipType, description, location, stipend, title, createdAt, opportunityId }) => {

  const { url, candidateProfileData } = useContextProvider();
  const [bookmark, setBookmark] = useState(false);

  const handleBookmarks = async () => {
    if (!candidateProfileData || !candidateProfileData._id) {
      console.error('Candidate profile data is not available');
      return;
    }
    const token = localStorage.getItem('token');
    if (!token) {
      toast.error("You need to be logged in to bookmark");
      return;
    }
    const candidateId = candidateProfileData._id;
    try {
      const response = await axios.post(`${url}/api/bookmark/post-bookmark/${candidateId}`,
        {
          opportunityId,
          companyName: company,
          companyLogo,
          opportunityType: internshipType,
          title,
          salary: stipend,
          type: "Internship",
          location: location ? location : "",
        }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })
      if (response.status === 201) {
        setBookmark(!bookmark);
        toast.success("Bookmark successfully added")
      } else {
        toast.error("Failed to add bookmark")
      }
    } catch (error) {
      console.error('Error adding bookmark:', error);
      toast.error(error?.response?.data?.message);
    }
  }

  const shortDescription = description.slice(0, 40) + (description.length > 40 ? '...' : '');
  const postedTime = getTimeDifference(createdAt);

  return (
    <div className='p-6 rounded-lg shadow-lg border border-gray-200 transition-transform transform hover:scale-105'>
      <div className='flex items-center justify-between mb-4'>
        <p className='text-sm font-semibold text-green-500'>{postedTime}</p>
        <button className='rounded-full p-2 hover:bg-gray-300' onClick={handleBookmarks}>
          {bookmark ? <FaBookmark className='w-5 h-5 text-purple-700' /> : <CiBookmark className='w-5 h-5' />}
        </button>
      </div>

      <div className='mb-4 flex justify-center items-center h-20 w-20 mx-auto'>
        <img src={`${url}/logo/${companyLogo}`} alt={`${company} Logo`} className='h-full w-full object-contain' />
      </div>

      <div className='text-center mb-4'>
        <h2 className='font-semibold text-2xl'>{company}</h2>
        {location ? <p className='text-sm text-gray-500'>{location}</p> : <p className='text-sm text-gray-500'>Remote</p>}
      </div>

      <div className='mb-6'>
        <h1 className='font-bold text-xl text-blue-700'>{title}</h1>
        <p className='text-sm text-gray-600'>{shortDescription}</p>
      </div>

      <div className='flex flex-row justify-between'>
        <div className='flex items-center gap-2 mt-2'>
          <span className="px-4 py-2 rounded-full bg-teal-500 text-white text-sm font-medium">{internshipType}</span>
          <span className="px-4 py-2 rounded-full bg-indigo-500 text-white text-sm font-medium">₹{stipend},000 /month</span>
        </div>
        <div className='flex items-center justify-end mt-6'>
          <Link to={`/internships/${opportunityId}`} className='text-sm text-blue-500 hover:text-blue-700 hover:underline'>Details</Link>
        </div>
      </div>
    </div>
  );
};

export default Internship
