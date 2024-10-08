import { toast } from "react-toastify";
import { useContextProvider } from "../../context/StoreContext";
import getTimeDifference from "../../utils/timeDifference";
import axios from "axios";
import { Link } from "react-router-dom";

const BookmarkCard = ({ id, companyName, companyLogo, opportunityType, location, title, salary, type, createdAt, onDelete, opportunityId }) => {

    const postedTime = getTimeDifference(createdAt);
    const { url } = useContextProvider();

    const handleDelete = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.delete(`${url}/api/bookmark/delete-bookmark/${id}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json',
                }
            });
            if (response.status === 201) {
                toast.success('Bookmark deleted successfully');
                onDelete(id);
            }
        } catch (error) {
            console.log(error)
            toast.error(error?.response?.data?.message);
        }
    };

    return (
        <div className='bg-white rounded-lg shadow-lg border border-gray-200 mb-3 lg:mb-5 p-6 relative'>
            <span className='bg-blue-100 text-blue-600 text-sm sm:text-md md:text-base font-medium px-4 py-2 rounded-full absolute top-4 right-4'>
                {type}
            </span>
            <div className='flex flex-col items-start mb-4'>
                <div className='flex items-center'>
                    <img src={`${url}/logo/${companyLogo}`} alt={`${companyName} logo`} className='w-14 h-14 md:w-17 md:h-17 xl:h-20 xl:w-20 rounded-full object-cover shadow-md' />
                    <div className='ml-4'>
                        <h2 className='text-xl md:text-2xl font-bold'>{companyName}</h2>
                        <p className='text-lg md:text-xl font-semibold text-blue-600'>{title}</p>
                    </div>
                </div>
                <div className="flex flex-row gap-3 mt-4">
                    <span className='bg-blue-100 text-blue-600 text-sm sm:text-md md:text-base font-medium px-4 py-2 rounded-full'>
                        {opportunityType}
                    </span>
                    {type === "Job" ?
                        <span className='bg-blue-100 text-blue-600 text-sm sm:text-md md:text-base font-medium px-4 py-2 rounded-full'>
                            ₹{salary} LPA
                        </span> :
                        <span className='bg-blue-100 text-blue-600 text-sm sm:text-md md:text-base font-medium px-4 py-2 rounded-full'>
                            ₹{salary},000 /month
                        </span>}
                    {location ?
                        <>
                            <span className='bg-blue-100 text-blue-600 text-sm sm:text-md md:text-base font-medium px-4 py-2 rounded-full'>
                                {location}
                            </span>
                        </> : <></>
                    }
                </div>
                <span className='bg-gray-100 text-gray-600 text-sm sm:text-md md:text-base font-medium px-4 py-2 rounded-full mt-4'>
                    {postedTime}
                </span>
            </div>
            <div className='flex justify-end gap-3 mt-2'>
                <button onClick={handleDelete} className='bg-red-500 text-white text-sm sm:text-md md:text-base px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500'>
                    Delete
                </button>
                {type === "Job" ?
                    <>
                        <Link to={`/jobs/${opportunityId}`} className='bg-blue-500 text-white text-sm sm:text-md md:text-base px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500'>
                            View Details
                        </Link>
                    </> : <>
                        <Link to={`/internships/${opportunityId}`} className='bg-blue-500 text-white text-sm sm:text-md md:text-base px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500'>
                            View Details
                        </Link>
                    </>}
            </div>
        </div>
    );
};

export default BookmarkCard;
