import axios from 'axios';
import { Sidebar } from '../../components';
import { useContextProvider } from '../../context/StoreContext';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import getTimeDifference from '../../utils/timeDifference';

const OpportunitiesPosted = () => {
  const { url, postedOpportunities, setPostedOpportunities } = useContextProvider();

  const jobs = postedOpportunities?.jobs?.length ? postedOpportunities.jobs : [];
  const internships = postedOpportunities?.internships?.length ? postedOpportunities.internships : [];

  const opportunities = [...jobs, ...internships];
  opportunities.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

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
    <div className='flex flex-col md:flex-row'>
      <Sidebar />
      <div className='flex-1 flex flex-col items-center min-h-screen bg-gray-100 p-6'>
        <header className='bg-blue-600 text-white py-3 md:py-4 px-4 md:px-6 rounded-lg shadow-lg mb-4 md:mb-6 w-full max-w-3xl'>
          <div className='container mx-auto text-center'>
            <h1 className='text-2xl md:text-3xl lg:text-4xl font-extrabold'>Opportunities Posted</h1>
          </div>
        </header>
        <div className='w-full max-w-3xl'>
          {opportunities.length !== 0 ? (
            opportunities.map((opportunity) => (
              <div key={opportunity._id} className='bg-white rounded-lg shadow-lg border border-gray-200 mb-6 p-6 relative'>
                <span className='bg-blue-100 text-blue-600 md:text-base text-sm font-medium px-4 py-2 rounded-full absolute md:top-4 md:right-4 top-6 right-6'>
                  {opportunity.type || opportunity.type}
                </span>
                <div className='flex flex-col items-start mb-2 md:mb-4'>
                  <p className='text-base md:text-lg lg:text-xl xl:text-2xl font-semibold text-blue-600'>{opportunity.title}</p>
                  <div className="flex flex-row gap-3 mt-4">
                    <span className='bg-blue-100 text-blue-600 md:text-base sm:text-sm text-xs font-medium px-4 py-2 rounded-full'>
                      {opportunity.internshipType || opportunity.jobType}
                    </span>
                    {opportunity.type === "Internship" ?
                      <span className='bg-blue-100 text-blue-600 md:text-base sm:text-sm text-xs font-medium px-4 py-2 rounded-full'>
                        ₹{opportunity.stipend},000 /month
                      </span> : <span className='bg-blue-100 text-blue-600 md:text-base sm:text-sm text-xs font-medium px-4 py-2 rounded-full'>
                        ₹{opportunity.salary} LPA
                      </span>
                    }
                  </div>
                </div>
                <div className='flex flex-col md:flex-row sm:justify-between gap-3 sm:mt-2'>
                  <div className='my-2'>
                    <span className='bg-gray-100 text-gray-600 md:text-base sm:text-sm text-xs font-medium px-4 py-2 rounded-full mt-4 mr-2'>
                      {getTimeDifference(opportunity.createdAt)}
                    </span>
                    <span className='bg-purple-100 text-red-800 md:text-base sm:text-sm text-xs font-medium px-4 py-2 rounded-full'>
                      {opportunity.applications.length} Applications
                    </span>
                  </div>
                  <div className='flex flex-row gap-2'>
                    <button onClick={() => handleDeleteOpportunity(opportunity._id, opportunity.type)} className='bg-red-500 text-white md:text-base sm:text-sm text-xs px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500'>
                      Delete
                    </button>
                    <Link to={`/view-applications/${opportunity._id}?type=${opportunity.type}`} className='bg-blue-500 text-white md:text-base sm:text-sm text-xs px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500'>
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className='text-gray-600 text-lg text-center'>No opportunities posted yet!</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default OpportunitiesPosted;