const BookmarkCard = ({ job }) => {
    const { type, logo, companyName, salary, role, workType, postedDate } = job;

    const handleDelete = () => {
        console.log('Delete button clicked for:', companyName);
    };

    const handleViewDetails = () => {
        console.log('View details button clicked for:', companyName);
    };

    const handleApply = () => {
        console.log('Apply button clicked for:', companyName);
    };

    return (
        <div className='bg-white rounded-lg shadow-lg border border-gray-200 mb-6 p-6 relative'>
            <span className='bg-blue-100 text-blue-600 text-lg font-medium px-4 py-2 rounded-full absolute top-4 right-4'>
                {type}
            </span>
            <div className='flex flex-col items-start mb-4'>
                <div className='flex items-center'>
                    <img src={logo} alt={`${companyName} logo`} className='w-20 h-20 rounded-full object-cover border-2 border-gray-300 shadow-md' />
                    <div className='ml-4'>
                        <h2 className='text-2xl font-bold'>{companyName}</h2>
                        <p className='text-xl font-semibold text-blue-600'>{role}</p>
                    </div>
                </div>
                <div className="flex flex-row gap-3 mt-4">
                    <span className='bg-blue-100 text-blue-600 text-lg font-medium px-4 py-2 rounded-full'>
                        {workType}
                    </span>
                    <span className='bg-blue-100 text-blue-600 text-lg font-medium px-4 py-2 rounded-full'>
                        {salary}
                    </span>
                </div>
                <span className='bg-gray-100 text-gray-600 text-sm font-medium px-4 py-2 rounded-full mt-4'>
                    {postedDate}
                </span>
            </div>
            <div className='flex justify-end gap-3 mt-4'>
                <button onClick={handleDelete} className='bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500'>
                    Delete
                </button>
                <button onClick={handleViewDetails} className='bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500'>
                    View Details
                </button>
                <button onClick={handleApply} className='bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500'>
                    Apply
                </button>
            </div>
        </div>
    );
};

export default BookmarkCard;
