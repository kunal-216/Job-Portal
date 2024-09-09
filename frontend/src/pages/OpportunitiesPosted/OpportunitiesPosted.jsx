import axios from 'axios';
import { Sidebar } from '../../components';
import { useContextProvider } from '../../context/StoreContext';
import { toast } from 'react-toastify';

const OpportunitiesPosted = () => {

  const { url, postedOpportunities, setPostedOpportunities } = useContextProvider();

  const jobs = postedOpportunities?.jobs?.length ? postedOpportunities.jobs : [];
  const internships = postedOpportunities?.internships?.length ? postedOpportunities.internships : [];

  const opportunities = [...jobs, ...internships];

  opportunities.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

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

  const handleViewDetails = (id) => {
    console.log('View details button clicked for index:', id);
  };

  const handleDeleteOpportunity = async (id, type) => {
    try {
      const response = await axios.delete(`${url}/api/opportunity/remove-posted-opportunity/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })

      if (response.status === 200) {
        setPostedOpportunities((prevOpportunities) => {
          if (type === 'job') {
            return {
              ...prevOpportunities,
              jobs: prevOpportunities.jobs.filter((job) => job._id !== id)
            };
          } else if (type === 'internship') {
            return {
              ...prevOpportunities,
              internships: prevOpportunities.internships.filter((internship) => internship._id !== id)
            };
          }
          return prevOpportunities;
        });
        toast.success("Opportunity deleted successfully")
      }
    } catch (error) {
      console.log(error);
      toast.error("Error deleting opportunity");
    }
  }

  return (
    <div className='flex'>
      <Sidebar />
      <div className='flex-1 flex flex-col items-center min-h-screen bg-gray-100 p-6'>
        <header className='w-[67%] bg-blue-600 text-white py-4 rounded-lg shadow-lg mb-6'>
          <div className='container mx-auto text-center'>
            <h1 className='text-4xl font-extrabold'>Opportunities Posted</h1>
          </div>
        </header>
        <div className='w-full max-w-4xl'>
          {opportunities.length !== 0 ? (
            opportunities.map((opportunity) => (
              <div key={opportunity._id} className='bg-white rounded-lg shadow-lg border border-gray-200 mb-6 p-6 relative'>
                <span className='bg-blue-100 text-blue-600 text-lg font-medium px-4 py-2 rounded-full absolute top-4 right-4'>
                  {opportunity.type || opportunity.type}
                </span>
                <div className='flex flex-col items-start mb-4'>
                  <p className='text-xl font-semibold text-blue-600'>{opportunity.title}</p>
                  <div className="flex flex-row gap-3 mt-4">
                    <span className='bg-blue-100 text-blue-600 text-lg font-medium px-4 py-2 rounded-full'>
                      {opportunity.internshipType || opportunity.jobType}
                    </span>
                    {opportunity.type === "Internship" ?
                        <span className='bg-blue-100 text-blue-600 text-lg font-medium px-4 py-2 rounded-full'>
                          ₹{opportunity.stipend},000 /month
                        </span> : <span className='bg-blue-100 text-blue-600 text-lg font-medium px-4 py-2 rounded-full'>
                          ₹{opportunity.salary} LPA
                        </span>
                    }
                  </div>
                  <span className='bg-gray-100 text-gray-600 text-lg font-medium px-4 py-2 rounded-full mt-4'>
                    {getTimeDifference(opportunity.createdAt)}
                  </span>
                </div>
                <div className='flex justify-between gap-3 mt-4'>
                  <div className='my-2'>
                    <span className='bg-purple-100 text-red-800 text-md font-medium px-4 py-2 rounded-full mt-2'>
                      {opportunity.applications.length} Applications
                    </span>
                  </div>
                  <div className='flex flex-row gap-2'>
                    <button onClick={() => handleDeleteOpportunity(opportunity._id, opportunity.type)} className='bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500'>
                      Delete
                    </button>
                    <button onClick={() => handleViewDetails(opportunity._id)} className='bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500'>
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
