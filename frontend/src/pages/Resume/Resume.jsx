import { Sidebar } from '../../components/index'
import { useState, useEffect } from 'react';
import { useContextProvider } from '../../context/StoreContext';

const Resume = () => {
  const { url, candidateProfileData } = useContextProvider();
  const [resumeUrl, setResumeUrl] = useState('');

  useEffect(() => {
    const resumeLink = `${url}/resume/${candidateProfileData?.resume}`;
    setResumeUrl(resumeLink);
  }, [candidateProfileData, url]);

  return (
    <div className='flex'>
      <Sidebar />
      <div className='flex-1 flex flex-col items-center justify-center min-h-screen p-2'>
        <header className='bg-blue-600 text-white py-3 md:py-4 px-4 md:px-6 rounded-lg shadow-lg mb-4 md:mb-6 w-full max-w-4xl'>
          <div className='container mx-auto text-center'>
            <h1 className='text-2xl md:text-3xl lg:text-4xl font-extrabold'>Resume</h1>
          </div>
        </header>
        <div className='w-full max-w-4xl h-[400px] sm:h-[500px] md:h-[550px] lg:h-[600px] border rounded-lg shadow-lg'>
          {resumeUrl ? (
            <iframe
              src={resumeUrl}
              title="Resume"
              width="100%"
              height="100%"
              className='rounded-lg'
            />
          ) : (
            <p className='text-center text-gray-500'>Loading resume...</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Resume;
