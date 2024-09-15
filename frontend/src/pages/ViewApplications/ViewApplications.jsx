/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useContextProvider } from "../../context/StoreContext";
import { toast } from "react-toastify";
import axios from "axios";
import { useParams, useLocation } from "react-router-dom";

const ViewApplications = () => {
    const { url } = useContextProvider();
    const { id } = useParams();
    const location = useLocation();
    const type = new URLSearchParams(location.search).get("type");
    const [allOpportunityApplications, setAllOpportunityApplications] = useState(null);

    const getOpportunityApplications = async () => {
        try {
            const response = await axios.get(`${url}/api/application/view-applications/${id}?type=${type}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (response.status === 200) {
                setAllOpportunityApplications(response.data);
            }
        } catch (error) {
            console.error(error);
            toast.error(error?.response?.data?.message || "Internal Server Error");
        }
    };

    const updateStatusHandler = async (applicationId, status) => {
        try {
            const response = await axios.post(`${url}/api/application/status`, {
                id: applicationId,
                status,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (response.status === 200) {
                toast.success("Status Updated");
                getOpportunityApplications();
            }
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message || "Internal Server Error");
        }
    };

    useEffect(() => {
        getOpportunityApplications(); 
    }, [id, type, url]);

    const applications = allOpportunityApplications || [];

    return (
        <div className="min-h-screen p-4 sm:p-6">
            <div className="rounded-xl px-2 sm:px-4 py-1 w-full max-w-4xl mx-auto">
                <header className='bg-gradient-to-r from-blue-500 to-blue-600 text-white py-2 sm:py-4 rounded-2xl shadow-md w-full max-w-3xl mb-8 sm:mb-12 mx-auto'>
                    <div className='text-center'>
                        <h1 className='text-xl sm:text-2xl font-bold tracking-wide'>All Applications</h1>
                    </div>
                </header>
                <div className="flex flex-wrap gap-4 sm:gap-6 justify-center">
                    {applications.length > 0 ? (
                        applications.map((item) => (
                            <div
                                key={item._id}
                                className="bg-white shadow-lg rounded-lg w-full max-w-3xl p-4 sm:p-6 hover:shadow-xl transition-shadow duration-300 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6">
                                <div className="flex flex-col items-center w-full sm:w-[25%]">
                                    <div className="w-32 h-32 sm:w-[160px] sm:h-[160px] bg-gray-200 rounded-md overflow-hidden shadow-md mb-4">
                                        <img
                                            src={`${url}/images/${item.applicant.image}`}
                                            alt={`${item.applicant.userId.name}'s profile`}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <a
                                        href={`${url}/resume/${item.applicant.resume}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-500 hover:text-blue-600 font-semibold transition-colors duration-200 text-base sm:text-lg">
                                        View Resume
                                    </a>
                                </div>
                                <div className="flex flex-col w-full sm:w-[75%]">
                                    <div className="text-xl sm:text-2xl font-bold text-gray-800 mb-2 sm:mb-3">
                                        {item.applicant.userId.name}
                                    </div>
                                    <div className="text-gray-600 text-base sm:text-lg mb-2 sm:mb-3">
                                        <strong>Gender: </strong> {item.applicant.gender}
                                    </div>
                                    <div className="text-gray-600 text-base sm:text-lg mb-2 sm:mb-3">
                                        <strong>Email: </strong> {item.applicant.userId.email}
                                    </div>
                                    <div className="text-gray-600 text-base sm:text-lg mb-4 sm:mb-6">
                                        <strong>University: </strong> {item.applicant.university}
                                    </div>
                                    <div className="flex-grow">
                                        {item.status === "Accepted" ?
                                            <div className="bg-green-500 text-white font-semibold px-3 py-1 sm:px-4 sm:py-2 rounded-lg inline text-sm sm:text-base">
                                                {item.status}
                                            </div>
                                            :
                                            item.status === "Rejected" ?
                                                <div className="bg-red-500 text-white font-semibold px-3 py-1 sm:px-4 sm:py-2 rounded-lg inline text-sm sm:text-base">
                                                    {item.status}
                                                </div>
                                                :
                                                <select
                                                    onChange={(e) => updateStatusHandler(item._id, e.target.value)}
                                                    id="status"
                                                    className="w-full sm:w-[95%] p-2 border rounded-md text-gray-600 text-base sm:text-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                                                    <option value="">Select Status</option>
                                                    <option value="Accepted">Accept</option>
                                                    <option value="Rejected">Reject</option>
                                                </select>
                                            }
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-center w-full">No applications found.</p>
                    )}
                </div>
            </div>
        </div>
    )
}

export default ViewApplications;