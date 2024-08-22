import React from 'react'
import { Sidebar } from '../../components/index'

const Resume = () => {
  return (
    <div className='flex'>
      <Sidebar />
      <div className='flex-1 flex items-center justify-center min-h-screen bg-gray-100'>
        Resume
      </div>
    </div>
  )
}

export default Resume
