import React from 'react'
import { Sidebar } from '../../components/index'

const Dashboard = () => {
  return (
    <div className='flex'>
      <Sidebar />
      <div className='flex-1 flex items-center justify-center min-h-screen bg-gray-100'>
        Dashboard
      </div>
    </div>
  )
}

export default Dashboard
