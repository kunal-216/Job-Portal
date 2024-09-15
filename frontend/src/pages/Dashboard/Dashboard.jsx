import { Sidebar } from '../../components/index';
import { useContextProvider } from '../../context/StoreContext';
import { FaUserFriends, FaCheckCircle, FaTimesCircle, FaChartBar } from "react-icons/fa";

const Dashboard = () => {
  const { profileData } = useContextProvider();

  const dashboardData = {
    totalApplications: 150,
    acceptedApplications: 45,
    rejectedApplications: 15,
    pendingApplications: 90,
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col p-6 space-y-6 bg-gray-100">
        <header className="w-full bg-blue-600 text-white py-4 rounded-lg shadow-lg">
          <div className="container mx-auto text-center">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold">
              Welcome, {profileData?.name?.split(" ")[0]}!
            </h1>
          </div>
        </header>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500">Total Applications</p>
                <p className="text-2xl font-bold">{dashboardData.totalApplications}</p>
              </div>
              <FaUserFriends className="text-blue-500 text-3xl" />
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500">Accepted</p>
                <p className="text-2xl font-bold">{dashboardData.acceptedApplications}</p>
              </div>
              <FaCheckCircle className="text-green-500 text-3xl" />
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500">Rejected</p>
                <p className="text-2xl font-bold">{dashboardData.rejectedApplications}</p>
              </div>
              <FaTimesCircle className="text-red-500 text-3xl" />
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500">Pending</p>
                <p className="text-2xl font-bold">{dashboardData.pendingApplications}</p>
              </div>
              <FaChartBar className="text-yellow-500 text-3xl" />
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
          <ul className="space-y-2">
            <li className="flex items-center justify-between">
              <span>New application received</span>
              <span className="text-gray-500">2 minutes ago</span>
            </li>
            <li className="flex items-center justify-between">
              <span>Application status updated</span>
              <span className="text-gray-500">1 hour ago</span>
            </li>
            <li className="flex items-center justify-between">
              <span>New job posted</span>
              <span className="text-gray-500">3 hours ago</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
