import React from 'react'
import { Sidebar } from '../../components'

const Bookmarked = () => {
  return (
    <div className='flex'>
      <Sidebar />
      <div className='flex-1 flex items-center justify-center min-h-screen bg-gray-100'>
        Bookmarked
      </div>
    </div>
  )
}

export default Bookmarked
