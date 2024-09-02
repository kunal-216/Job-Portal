
import { Sidebar } from '../../components/index';
import { useContextProvider } from '../../context/StoreContext';

const Profile = () => {
  const { profileData, url, userDesignation, candidateProfileData, recruiterProfileData } = useContextProvider();

  return (
    <div className='flex'>
      <Sidebar />
      <div className='flex-1 flex flex-col items-center bg-gray-100 p-6'>
        <header className='bg-blue-600 text-white py-4 px-6 rounded-lg shadow-lg mb-6 w-full max-w-4xl'>
          <div className='container mx-auto text-center'>
            <h1 className='text-3xl md:text-4xl font-extrabold'>Profile</h1>
          </div>
        </header>
        {profileData ? (
          <div className='w-full max-w-4xl bg-white shadow-md rounded-lg p-6'>
            {userDesignation === "Candidate" ? (
              <>
                <div className='flex justify-center mb-6'>
                  <img
                    src={`${url}/images/${candidateProfileData?.image}`}
                    className='rounded-full w-32 h-32 object-cover cursor-pointer border border-neutral-700'
                    alt="Profile"
                  />
                  <input
                    id="imageInput"
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }}
                    disabled
                  />
                </div>
                <div className='space-y-6'>
                  {renderProfileField('Name', profileData.name)}
                  <div className='flex gap-6'>
                    {renderProfileField('Gender', candidateProfileData?.gender, 'w-1/2')}
                    {renderProfileField('Age', candidateProfileData?.age, 'w-1/2')}
                  </div>
                  <div className='flex gap-6'>
                    {renderProfileField('Email', profileData.email, 'w-1/2')}
                    {renderProfileField('Designation', profileData.designation, 'w-1/2')}
                  </div>
                  {renderProfileField('Bio', candidateProfileData?.bio)}
                  {renderProfileField('Skills', candidateProfileData?.skills)}
                  {renderProfileField('University', candidateProfileData?.university)}
                </div>
              </>
            ) : (
              <>
                <div className='flex flex-col items-center mb-6'>
                  <img
                    src={`${url}/images/${recruiterProfileData?.companyLogo}`}
                    className='rounded-full w-32 h-32 object-cover cursor-pointer'
                    alt="Company Logo"
                  />
                </div>
                <div className='space-y-6'>
                  {renderProfileField('Name', profileData.name)}
                  <div className='flex gap-6'>
                    {renderProfileField('Gender', recruiterProfileData?.gender, 'w-1/2')}
                    {renderProfileField('Email', profileData.email, 'w-1/2')}
                  </div>
                  {renderProfileField('Designation', profileData.designation)}
                  <div className='flex gap-6'>
                    {renderProfileField('Company Name', recruiterProfileData?.companyName, 'w-1/2')}
                    {renderProfileField('Company Location', recruiterProfileData?.location, 'w-1/2')}
                  </div>
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

// Utility function to render profile fields
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