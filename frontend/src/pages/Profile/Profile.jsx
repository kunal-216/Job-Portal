import React from 'react'
import { Sidebar } from '../../components/index'
import { useContextProvider } from '../../context/StoreContext';

const Profile = () => {

  const { profileData } = useContextProvider();

  return (
    <div className='flex'>
      <Sidebar />
      <div className='flex-1 flex flex-col items-center bg-gray-100 p-4'>
        <h1 className='text-3xl font-semibold mb-4 mt-20'>Profile</h1>
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
                  className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
                  disabled
                />
              </div>
              <div className=''>
                <label htmlFor='gender' className='block text-sm font-medium text-gray-700'>Gender</label>
                <input
                  type='text'
                  value={profileData.gender}
                  name='gender'
                  className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
                  disabled
                />
              </div>
              <div className=''>
                <label htmlFor='email' className='block text-sm font-medium text-gray-700'>Email</label>
                <input
                  type='text'
                  value={profileData.email}
                  name='email'
                  className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
                  disabled
                />
              </div>
              <div className=''>
                <label htmlFor='designation' className='block text-sm font-medium text-gray-700'>Designation</label>
                <input
                  type='text'
                  value={profileData.designation}
                  name='designation'
                  className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
                  disabled
                />
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
