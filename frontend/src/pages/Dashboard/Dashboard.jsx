import { Sidebar } from '../../components/index'
import { useContextProvider } from "../../context/StoreContext"

const Dashboard = () => {

  const { profileData } = useContextProvider();

  return (
    <div className='flex'>
      <Sidebar />
      <div className='flex-1 flex items-center justify-center min-h-screen'>
        <header className='block bg-blue-600 text-white py-4 rounded-lg shadow-lg mb-6 mt-6 px-[162px]'>
          <div className='container mx-auto text-center'>
            <h1 className='text-4xl font-extrabold'>Welcome {profileData.name.split(" ")[0]}</h1>
          </div>
        </header>
      </div>
    </div>
  )
}

export default Dashboard
