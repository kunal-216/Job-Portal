import React from 'react'
import { Sidebar } from '../../components/index'

const Profile = () => {
  return (
    <div className='flex'>
      <Sidebar />
      <div className='flex-1 flex items-center justify-center min-h-screen bg-gray-100'>
        Profile
      </div>
    </div>
  )
}

export default Profile