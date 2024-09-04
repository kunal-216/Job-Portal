import { Sidebar, BookmarkCard } from '../../components';

const Bookmarked = () => {
  const bookmarks = [
    {
      type: 'Job',
      logo: 'https://via.placeholder.com/64',
      companyName: 'Company A',
      salary: '$60,000/year',
      role: 'Software Engineer',
      workType: 'Full-time',
      postedDate: '4 days ago',
    },
    {
      type: 'Internship',
      logo: 'https://via.placeholder.com/64',
      companyName: 'Company B',
      salary: '$20/hour',
      role: 'Marketing Intern',
      workType: 'Part-time',
      postedDate: '2 days ago',
    },
    {
      type: 'Job',
      logo: 'https://via.placeholder.com/64',
      companyName: 'Company A',
      salary: '$60,000/year',
      role: 'Software Engineer',
      workType: 'Full-time',
      postedDate: '4 days ago',
    },
    {
      type: 'Internship',
      logo: 'https://via.placeholder.com/64',
      companyName: 'Company B',
      salary: '$20/hour',
      role: 'Marketing Intern',
      workType: 'Part-time',
      postedDate: '2 days ago',
    },
  ];

  return (
    <div className='flex'>
      <Sidebar />
      <div className='flex-1 flex flex-col items-center min-h-screen bg-gray-100 mt-2 mb-6'>
        <header className='block bg-blue-600 text-white py-4 rounded-lg shadow-lg mb-6 mt-6 px-[285px]'>
          <div className='container mx-auto text-center'>
            <h1 className='text-4xl font-extrabold'>Bookmarks</h1>
          </div>
        </header>
        <div className='w-full max-w-3xl'>
          {bookmarks.map((job, index) => (
            <BookmarkCard key={index} job={job} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Bookmarked;
