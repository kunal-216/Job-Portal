import React from 'react'
import { Sidebar } from '../../components/index'

const Dashboard = () => {
  return (
    <div className='flex'>
      <Sidebar />
      <div className='flex-1 flex items-center justify-center min-h-screen bg-gray-100'>
        <div className='p-8 rounded-lg w-full max-w-4xl bg-white shadow-lg'>
          <h1 className='text-3xl font-semibold text-gray-800 mb-4 text-center'>Welcome to Your Dashboard!</h1>
          <p className='text-lg text-gray-700 text-center'>
            We're glad to have you here. Explore the sidebar to navigate through your profile, update your details, and check your applications. If you need any help, don't hesitate to reach out.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
