import { Link } from 'react-router-dom';
import { Sidebar } from '../../components/index';
import { useContextProvider } from '../../context/StoreContext';

const MyApplications = () => {
  const { applications } = useContextProvider();
  const myApplications = applications || [];

  return (
    <div className='flex'>
      <Sidebar />
      <div className='flex-1 min-h-screen p-6'>
        <header className='bg-blue-600 text-white py-4 rounded-lg shadow-lg mb-6'>
          <div className='container mx-auto text-center'>
            <h1 className='text-4xl font-extrabold'>My Applications</h1>
            <p className='mt-2 text-lg'>Keep track of all your job applications and internships in one place.</p>
          </div>
        </header>

        <div className='overflow-x-auto'>
          <table className='min-w-full bg-white border border-gray-300 rounded-lg shadow-md'>
            <thead className='bg-gray-200'>
              <tr>
                <th className='py-3 text-xl text-center px-4 border-b text-gray-600'>Company Name</th>
                <th className='py-3 text-xl text-center px-4 border-b text-gray-600'>Profile</th>
                <th className='py-3 text-xl text-center px-4 border-b text-gray-600'>Applied On</th>
                <th className='py-3 text-xl text-center px-4 border-b text-gray-600'>Number of Applicants</th>
                <th className='py-3 text-xl text-center px-4 border-b text-gray-600'>Application Status</th>
                <th className='py-3 text-xl text-center px-4 border-b text-gray-600'>Type</th>
                <th className='py-3 text-xl text-center px-4 border-b text-gray-600'>Review Application</th>
              </tr>
            </thead>
            <tbody>
              {myApplications.map((app, index) => {
                const job = app.jobId || null;
                const internship = app.internshipId || null;
                return (
                  <tr key={index} className='bg-white border-b hover:bg-gray-50'>
                    <td className='py-4 text-center px-6 text-lg text-gray-800'>
                      {job ? job.company : internship ? internship.company : 'N/A'}
                    </td>
                    <td className='py-4 text-center px-6 text-lg text-gray-800'>
                      {job ? job.title : internship ? internship.title : 'N/A'}
                    </td>
                    <td className='py-4 text-center px-6 text-lg text-gray-800'>
                      {new Date(app.createdAt).toLocaleDateString()}
                    </td>
                    <td className='py-4 text-center px-6 text-lg text-gray-800'>
                      {job ? job.applications.length : internship ? internship.applications.length : 0}
                    </td>
                    <td className='py-4 text-center px-6 text-lg text-gray-800'>
                      {app.status === "Accepted" ?
                        <div className='bg-green-400 p-2 rounded-lg text-white'>
                          {app.status}
                        </div>
                        :
                        app.status === "Rejected" ?
                          <div className='bg-red-400 p-2 rounded-lg text-white'>
                            {app.status}
                          </div>
                          :
                          <div className='bg-blue-400 p-2 rounded-lg text-white'>
                            {app.status}
                          </div>
                      }
                    </td>
                    <td className='py-4 text-center px-6 text-lg text-gray-800'>
                      {app.type}
                    </td>
                    <td className='py-4 px-16 text-lg text-gray-800'>
                      {app.type === "Job" && job ?
                        <Link to={`/jobs/${job._id}`} className='bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors'>
                          View
                        </Link>
                        : app.type === "Internship" && internship ?
                          <Link to={`/internships/${internship._id}`} className='bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors'>
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
  );
};

export default MyApplications;
