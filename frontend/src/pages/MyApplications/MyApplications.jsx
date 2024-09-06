import { Sidebar } from '../../components/index';

const MyApplications = () => {
  const applications = [
    {
      companyName: 'Company A',
      profile: 'Software Engineer',
      appliedOn: '2024-08-01',
      numberOfApplicants: 150,
      applicationStatus: 'Under Review',
      type: 'Job',
    },
    {
      companyName: 'Company B',
      profile: 'Product Manager',
      appliedOn: '2024-08-10',
      numberOfApplicants: 85,
      applicationStatus: 'Accepted',
      type: 'Internship',
    },
    {
      companyName: 'Company B',
      profile: 'Product Manager',
      appliedOn: '2024-08-10',
      numberOfApplicants: 85,
      applicationStatus: 'Accepted',
      type: 'Internship',
    },
    {
      companyName: 'Company B',
      profile: 'Product Manager',
      appliedOn: '2024-08-10',
      numberOfApplicants: 85,
      applicationStatus: 'Accepted',
      type: 'Internship',
    },
    {
      companyName: 'Company B',
      profile: 'Product Manager',
      appliedOn: '2024-08-10',
      numberOfApplicants: 85,
      applicationStatus: 'Accepted',
      type: 'Internship',
    },
    {
      companyName: 'Company B',
      profile: 'Product Manager',
      appliedOn: '2024-08-10',
      numberOfApplicants: 85,
      applicationStatus: 'Accepted',
      type: 'Internship',
    },
    {
      companyName: 'Company B',
      profile: 'Product Manager',
      appliedOn: '2024-08-10',
      numberOfApplicants: 85,
      applicationStatus: 'Accepted',
      type: 'Internship',
    },
    {
      companyName: 'Company B',
      profile: 'Product Manager',
      appliedOn: '2024-08-10',
      numberOfApplicants: 85,
      applicationStatus: 'Accepted',
      type: 'Internship',
    },

  ];

  return (
    <div className='flex'>
      <Sidebar />
      <div className='flex-1 min-h-screen bg-gray-100 p-6'>
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
              {applications.map((app, index) => (
                <tr key={index} className='bg-white border-b hover:bg-gray-50'>
                  <td className='py-4 text-center px-6 text-lg text-gray-800'>{app.companyName}</td>
                  <td className='py-4 text-center px-6 text-lg text-gray-800'>{app.profile}</td>
                  <td className='py-4 text-center px-6 text-lg text-gray-800'>{app.appliedOn}</td>
                  <td className='py-4 text-center px-6 text-lg text-gray-800'>{app.numberOfApplicants}</td>
                  <td className='py-4 text-center px-6 text-lg text-gray-800'>{app.applicationStatus}</td>
                  <td className='py-4 text-center px-6 text-lg text-gray-800'>{app.type}</td>
                  <td className='py-4 px-16 text-lg text-gray-800'>
                    <button className='bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors'>
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      </div>
    </div>
  );
};

export default MyApplications;
