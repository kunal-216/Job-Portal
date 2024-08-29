import { Sidebar } from '../../components/index'
import { useContextProvider } from '../../context/StoreContext';

const Profile = () => {

  const { profileData, url } = useContextProvider();

  return (
    <div className='flex'>
      <Sidebar />
      <div className='flex-1 flex flex-col items-center bg-gray-100 '>
        <header className='block bg-blue-600 text-white py-4 rounded-lg shadow-lg mb-6 mt-6 px-[162px]'>
          <div className='container mx-auto text-center'>
            <h1 className='text-4xl font-extrabold'>Profile</h1>
          </div>
        </header>
        {profileData ? (
          <div className='w-full max-w-md'>
            <div className='flex justify-center mb-4'>
              <img
                src={`${url}/images/${profileData.image}`}
                className='rounded-full w-32 h-32 object-cover cursor-pointer'
              />
              <input
                id="imageInput"
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                disabled
              />
            </div>
            <div className='space-y-4'>
              <div className=''>
                <label htmlFor='name' className='block text-sm font-medium text-gray-700'>Name</label>
                <input
                  type='text'
                  value={profileData.name}
                  name='name'
                  className='mt-1 p-2 block w-full border border-gray-300 rounded-md bg-gray-200'
                  disabled
                />
              </div>
              <div className=''>
                <label htmlFor='gender' className='block text-sm font-medium text-gray-700'>Gender</label>
                <input
                  type='text'
                  value={profileData.gender}
                  name='gender'
                  className='mt-1 p-2 block w-full border border-gray-300 rounded-md bg-gray-200'
                  disabled
                />
              </div>
              <div className=''>
                <label htmlFor='email' className='block text-sm font-medium text-gray-700'>Email</label>
                <input
                  type='text'
                  value={profileData.email}
                  name='email'
                  className='mt-1 p-2 block w-full border border-gray-300 rounded-md bg-gray-200'
                  disabled
                />
              </div>
              <div className=''>
                <label htmlFor='designation' className='block text-sm font-medium text-gray-700'>Designation</label>
                <input
                  type='text'
                  value={profileData.designation}
                  name='designation'
                  className='mt-1 p-2 block w-full border border-gray-300 rounded-md bg-gray-200'
                  disabled
                />
              </div>
              <div className=''>
              <label htmlFor='bio' className='block text-sm font-medium text-gray-700'>Bio</label>
              <input
                type='text'
                value={profileData.bio}
                name='bio'
                className='mt-1 p-2 block w-full border border-gray-300 rounded-md bg-gray-200'
                disabled
              />
            </div>
            <div className='mt-4'>
              <label htmlFor='resume' className='block text-sm font-medium text-gray-700'>Resume</label>
              {profileData.resume ? (
                <div className='mt-2'>
                  <a
                    href={`${url}/resume/${profileData.resume}`}
                    className='text-blue-600 hover:underline'
                    target='_blank'
                    rel='noopener noreferrer'>
                    View Resume
                  </a>
                </div>
              ) : (
                <p className='text-gray-600'>No resume available</p>
              )}
            </div>
            </div>
          </div>
        ) : (
          <p className='text-gray-600'>Loading profile data...</p>
        )}
      </div>
    </div>
  )
}

export default Profile
