import { useState } from 'react'
import { FaBookmark } from "react-icons/fa";
import { CiBookmark } from "react-icons/ci"
import { useContextProvider } from '../../context/StoreContext';

const Internship = ({ company, companyLogo, description, internshipType, location, stipend, title, createdAt }) => {

  const { url } = useContextProvider();
  const [bookmark, setBookmark] = useState("true");

  const shortDescription = description.slice(0, 40) + (description.length > 40 ? '...' : '');

  const getTimeDifference = (createdAt) => {
    const now = new Date();
    const createdDate = new Date(createdAt);
    const timeDiff = Math.abs(now - createdDate);

    const hoursDiff = Math.floor(timeDiff / (1000 * 60 * 60));
    const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

    if (hoursDiff < 2) {
      return 'Posted Just Now';
    } else if (daysDiff === 0) {
      return 'Today';
    } else if (daysDiff === 1) {
      return '1 day ago';
    } else if (daysDiff <= 6) {
      return `${daysDiff} days ago`;
    } else if (daysDiff <= 30) {
      return 'Last week';
    } else {
      return 'Last month';
    }
  };

  const postedTime = getTimeDifference(createdAt);

  return (
    <div className='p-6 rounded-lg shadow-lg border border-gray-200 transition-transform transform hover:scale-105'>
      <div className='flex items-center justify-between mb-4'>
        <p className='text-sm font-semibold text-green-500'>{postedTime}</p>
        <button className='rounded-full p-2 hover:bg-gray-300' onClick={() => setBookmark(prev => !prev)}>
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
          <span className="px-4 py-2 rounded-full bg-indigo-500 text-white text-sm font-medium">{stipend}</span>
        </div>
        <div className='flex items-center justify-end mt-6'>
          <button className='text-sm text-blue-500 hover:text-blue-700 hover:underline'>Details</button>
        </div>
      </div>
    </div>
  )
}

export default Internship
