import { Sidebar } from '../../components/index';
import { useContextProvider } from '../../context/StoreContext';

const Profile = () => {
  const { profileData, url, userDesignation, candidateProfileData, recruiterProfileData } = useContextProvider();

  return (
    <div className='flex flex-col md:flex-row min-h-screen'>
      <Sidebar />
      <div className='flex-1 flex flex-col items-center p-6'>
        <header className='bg-blue-600 text-white py-4 px-6 rounded-lg shadow-lg mb-6 w-full max-w-4xl'>
          <div className='text-center'>
            <h1 className='text-2xl md:text-4xl font-extrabold'>Profile</h1>
          </div>
        </header>
        {profileData ? (
          <div className='w-full max-w-4xl bg-white shadow-md rounded-lg p-6 mb-5'>
            {userDesignation === "Candidate" ? (
              <>
                <div className='flex justify-center mb-6'>
                  <img
                    src={`${url}/images/${candidateProfileData?.image}`}
                    className='rounded-full w-24 h-24 md:w-32 md:h-32 object-cover border border-neutral-700'
                    alt="Profile"
                  />
                </div>
                <div className='space-y-6'>
                  {renderProfileField('Name', profileData.name)}
                  
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    {renderProfileField('Gender', candidateProfileData?.gender)}
                    {renderProfileField('Age', candidateProfileData?.age)}
                  </div>
                  
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    {renderProfileField('Email', profileData.email)}
                    {renderProfileField('Designation', profileData.designation)}
                  </div>

                  {renderProfileField('Bio', candidateProfileData?.bio)}
                  
                  {candidateProfileData?.skills && (
                    <div className='flex flex-col'>
                      <label htmlFor="skills" className='block text-sm font-medium text-gray-700'>
                        Skills
                      </label>
                      <div className='mt-1 flex flex-wrap gap-2'>
                        {candidateProfileData.skills.map((skill, index) => (
                          <span key={index} className='bg-blue-600 text-white text-sm font-medium py-1 px-3 rounded-full'>
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {renderProfileField('University', candidateProfileData?.university)}
                </div>
              </>
            ) : (
              <>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-10 justify-center mb-6'>
                  <div className='flex flex-col items-center'>
                    <img
                      src={`${url}/images/${recruiterProfileData?.image}`}
                      className='rounded-full w-24 h-24 md:w-32 md:h-32 object-cover'
                      alt="Recruiter Image"
                    />
                  </div>
                  <div className='flex flex-col items-center'>
                    <img
                      src={`${url}/logo/${recruiterProfileData?.companyLogo}`}
                      className='rounded-full w-24 h-24 md:w-32 md:h-32 object-cover'
                      alt="Company Logo"
                    />
                  </div>
                </div>

                <div className='space-y-6'>
                  {renderProfileField('Name', profileData.name)}
                  
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    {renderProfileField('Gender', recruiterProfileData?.gender)}
                    {renderProfileField('Email', profileData.email)}
                  </div>

                  {renderProfileField('Designation', profileData.designation)}
                  
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    {renderProfileField('Company Name', recruiterProfileData?.companyName)}
                    {renderProfileField('Company Location', recruiterProfileData?.location)}
                  </div>

                  {renderProfileField('About the company', recruiterProfileData?.aboutCompany)}
                  {renderProfileField('Website of the company', recruiterProfileData?.websiteOfCompany)}
                </div>
              </>
            )}
          </div>
        ) : (
          <p className='text-gray-600'>Loading profile data...</p>
        )}
      </div>
    </div>
  );
};

const renderProfileField = (label, value, className = '') => (
  <div className={`flex flex-col ${className}`}>
    <label htmlFor={label.toLowerCase()} className='block text-sm font-medium text-gray-700'>
      {label}
    </label>
    <input
      type='text'
      value={value || ''}
      name={label.toLowerCase()}
      className='mt-1 p-2 block w-full border border-gray-300 rounded-md bg-gray-200'
      disabled
    />
  </div>
);

export default Profile;
