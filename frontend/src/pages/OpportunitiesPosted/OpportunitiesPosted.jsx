import { Sidebar } from '../../components';

const OpportunitiesPosted = () => {

  const opportunities = [
    {
      type: 'Job',
      salary: '$60,000 - $80,000',
      role: 'Software Engineer Job',
      workType: 'Full Time',
      postedDate: '5 days ago',
      candidatesApplied: 134
    },
    {
      type: 'Internship',
      salary: 'Unpaid',
      role: ' Full Stack Development Intern',
      workType: 'Part Time',
      postedDate: '2 days ago',
      candidatesApplied: 134
    },
    {
      type: 'Internship',
      salary: 'Unpaid',
      role: ' Full Stack Development Intern',
      workType: 'Part Time',
      postedDate: '2 days ago',
      candidatesApplied: 134
    },
    {
      type: 'Internship',
      salary: 'Unpaid',
      role: ' Full Stack Development Intern',
      workType: 'Part Time',
      postedDate: '2 days ago',
      candidatesApplied: 134
    },
    {
      type: 'Internship',
      salary: 'Unpaid',
      role: ' Full Stack Development Intern',
      workType: 'Part Time',
      postedDate: '2 days ago',
      candidatesApplied: 134
    },
  ];

  const handleDelete = (index) => {
    console.log('Delete button clicked for index:', index);
  };

  const handleViewDetails = (index) => {
    console.log('View details button clicked for index:', index);
  };

  return (
    <div className='flex'>
      <Sidebar />
      <div className='flex-1 flex flex-col items-center min-h-screen bg-gray-100 p-6'>
        <header className='w-[45%] bg-blue-600 text-white py-4 rounded-lg shadow-lg mb-6'>
          <div className='container mx-auto text-center'>
            <h1 className='text-4xl font-extrabold'>Opportunities Posted</h1>
          </div>
        </header>
        <div className='w-full max-w-4xl'>
          {opportunities.length > 0 ? (
            opportunities.map((opportunity, index) => (
              <div key={index} className='bg-white rounded-lg shadow-lg border border-gray-200 mb-6 p-6 relative'>
                <span className='bg-blue-100 text-blue-600 text-lg font-medium px-4 py-2 rounded-full absolute top-4 right-4'>
                  {opportunity.type}
                </span>
                <div className='flex flex-col items-start mb-4'>
                  <p className='text-xl font-semibold text-blue-600'>{opportunity.role}</p>
                  <div className="flex flex-row gap-3 mt-4">
                    <span className='bg-blue-100 text-blue-600 text-lg font-medium px-4 py-2 rounded-full'>
                      {opportunity.workType}
                    </span>
                    <span className='bg-blue-100 text-blue-600 text-lg font-medium px-4 py-2 rounded-full'>
                      {opportunity.salary}
                    </span>
                  </div>
                  <span className='bg-gray-100 text-gray-600 text-lg font-medium px-4 py-2 rounded-full mt-4'>
                    {opportunity.postedDate}
                  </span>
                </div>
                <div className='flex justify-between gap-3 mt-4'>
                  <div className='my-2'>
                    <span className='bg-purple-100 text-red-800 text-md font-medium px-4 py-2 rounded-full mt-2'>
                      {opportunity.candidatesApplied} Applications
                    </span>
                  </div>
                  <div className='flex flex-row gap-2'>
                    <button onClick={() => handleDelete(index)} className='bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500'>
                      Delete
                    </button>
                    <button onClick={() => handleViewDetails(index)} className='bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500'>
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className='text-gray-600 text-lg text-center'>No opportunities available.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default OpportunitiesPosted;
