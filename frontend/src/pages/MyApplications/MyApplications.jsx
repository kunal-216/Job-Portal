import { Link } from 'react-router-dom';
import { Sidebar } from '../../components/index';
import { useContextProvider } from '../../context/StoreContext';

const MyApplications = () => {
  const { applications } = useContextProvider();
  const myApplications = applications || [];

  return (
    <div className='flex flex-col md:flex-row'>
      <Sidebar />
      <div className='flex-1 min-h-screen p-4 md:p-6'>
        <header className='bg-blue-600 text-white py-3 md:py-4 rounded-lg shadow-lg mb-4 md:mb-6'>
          <div className='container mx-auto text-center px-2'>
            <h1 className='text-2xl md:text-4xl font-extrabold'>My Applications</h1>
            <p className='mt-1 md:mt-2 text-sm md:text-lg'>Keep track of all your job applications and internships in one place.</p>
          </div>
        </header>

        <div className='overflow-x-auto'>
          <div className='inline-block min-w-full align-middle'>
            <div className='overflow-hidden border border-gray-300 rounded-lg shadow-md'>
              <table className='min-w-full divide-y divide-gray-300'>
                <thead className='bg-gray-200'>
                  <tr>
                    <th className='py-2 px-3 md:py-3 md:px-4 text-xs md:text-sm font-semibold text-gray-600 uppercase tracking-wider'>Company</th>
                    <th className='py-2 px-3 md:py-3 md:px-4 text-xs md:text-sm font-semibold text-gray-600 uppercase tracking-wider'>Profile</th>
                    <th className='py-2 px-3 md:py-3 md:px-4 text-xs md:text-sm font-semibold text-gray-600 uppercase tracking-wider'>Applied On</th>
                    <th className='py-2 px-3 md:py-3 md:px-4 text-xs md:text-sm font-semibold text-gray-600 uppercase tracking-wider'>Applicants</th>
                    <th className='py-2 px-3 md:py-3 md:px-4 text-xs md:text-sm font-semibold text-gray-600 uppercase tracking-wider'>Status</th>
                    <th className='py-2 px-3 md:py-3 md:px-4 text-xs md:text-sm font-semibold text-gray-600 uppercase tracking-wider'>Type</th>
                    <th className='py-2 px-3 md:py-3 md:px-4 text-xs md:text-sm font-semibold text-gray-600 uppercase tracking-wider'>Action</th>
                  </tr>
                </thead>
                <tbody className='bg-white divide-y divide-gray-200'>
                  {myApplications.map((app, index) => {
                    const job = app.jobId || null;
                    const internship = app.internshipId || null;
                    return (
                      <tr key={index} className='hover:bg-gray-50 text-center'>
                        <td className='py-2 px-3 md:py-4 md:px-6 text-xs md:text-sm text-gray-800 whitespace-nowrap'>
                          {job ? job.company : internship ? internship.company : 'N/A'}
                        </td>
                        <td className='py-2 px-3 md:py-4 md:px-6 text-xs md:text-sm text-gray-800 whitespace-nowrap'>
                          {job ? job.title : internship ? internship.title : 'N/A'}
                        </td>
                        <td className='py-2 px-3 md:py-4 md:px-6 text-xs md:text-sm text-gray-800 whitespace-nowrap'>
                          {new Date(app.createdAt).toLocaleDateString()}
                        </td>
                        <td className='py-2 px-3 md:py-4 md:px-6 text-xs md:text-sm text-gray-800 whitespace-nowrap'>
                          {job ? job.applications.length : internship ? internship.applications.length : 0}
                        </td>
                        <td className='py-2 px-3 md:py-4 md:px-6 text-xs md:text-sm text-gray-800 whitespace-nowrap'>
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${app.status === "Accepted" ? 'bg-green-100 text-green-800' :
                              app.status === "Rejected" ? 'bg-red-100 text-red-800' :
                                'bg-blue-100 text-blue-800'
                            }`}>
                            {app.status}
                          </span>
                        </td>
                        <td className='py-2 px-3 md:py-4 md:px-6 text-xs md:text-sm text-gray-800 whitespace-nowrap'>
                          {app.type}
                        </td>
                        <td className='py-2 px-3 md:py-4 md:px-6 text-xs md:text-sm text-gray-800 whitespace-nowrap'>
                          {app.type === "Job" && job ?
                            <Link to={`/jobs/${job._id}`} className='bg-blue-500 text-white px-2 py-1 md:px-4 md:py-2 rounded-md hover:bg-blue-600 transition-colors text-xs md:text-sm'>
                              View
                            </Link>
                            : app.type === "Internship" && internship ?
                              <Link to={`/internships/${internship._id}`} className='bg-blue-500 text-white px-2 py-1 md:px-4 md:py-2 rounded-md hover:bg-blue-600 transition-colors text-xs md:text-sm'>
                                View
                              </Link>
                              : 'N/A'
                          }
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyApplications;
