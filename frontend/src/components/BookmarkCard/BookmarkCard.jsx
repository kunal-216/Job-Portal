import { useContextProvider } from "../../context/StoreContext";
import getTimeDifference from "../../utils/timeDifference";

const BookmarkCard = ({ companyName, companyLogo, opportunityType,location, title, salary, type, createdAt }) => {

    const postedTime = getTimeDifference(createdAt);
    const { url } = useContextProvider();

    const handleDelete = () => {
        console.log('Delete button clicked for:', companyName);
    };

    const handleViewDetails = () => {
        console.log('View details button clicked for:', companyName);
    };

    return (
        <div className='bg-white rounded-lg shadow-lg border border-gray-200 mb-6 p-6 relative'>
            <span className='bg-blue-100 text-blue-600 text-lg font-medium px-4 py-2 rounded-full absolute top-4 right-4'>
                {type}
            </span>
            <div className='flex flex-col items-start mb-4'>
                <div className='flex items-center'>
                    <img src={`${url}/logo/${companyLogo}`} alt={`${companyName} logo`} className='w-20 h-20 rounded-full object-cover shadow-md' />
                    <div className='ml-4'>
                        <h2 className='text-2xl font-bold'>{companyName}</h2>
                        <p className='text-xl font-semibold text-blue-600'>{title}</p>
                    </div>
                </div>
                <div className="flex flex-row gap-3 mt-4">
                    <span className='bg-blue-100 text-blue-600 text-lg font-medium px-4 py-2 rounded-full'>
                        {opportunityType}
                    </span>
                    <span className='bg-blue-100 text-blue-600 text-lg font-medium px-4 py-2 rounded-full'>
                        {salary}
                    </span>
                    {location ?
                        <>
                            <span className='bg-blue-100 text-blue-600 text-lg font-medium px-4 py-2 rounded-full'>
                                {location}
                            </span>
                        </> : <></>
                    }
                </div>
                <span className='bg-gray-100 text-gray-600 text-sm font-medium px-4 py-2 rounded-full mt-4'>
                    {postedTime}
                </span>
            </div>
            <div className='flex justify-end gap-3 mt-4'>
                <button onClick={handleDelete} className='bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500'>
                    Delete
                </button>
                <button onClick={handleViewDetails} className='bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500'>
                    View Details
                </button>
            </div>
        </div>
    );
};

export default BookmarkCard;
