import { Sidebar } from '../../components'

const Bookmarked = () => {
  return (
    <div className='flex'>
      <Sidebar />
      <div className='flex-1 flex items-center justify-center min-h-screen bg-gray-100'>
        <header className='block bg-blue-600 text-white py-4 rounded-lg shadow-lg mb-6 mt-6 px-[162px]'>
          <div className='container mx-auto text-center'>
            <h1 className='text-4xl font-extrabold'>Bookmarks</h1>
          </div>
        </header>
      </div>
    </div>
  )
}

export default Bookmarked
