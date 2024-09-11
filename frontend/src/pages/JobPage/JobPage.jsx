/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useContextProvider } from "../../context/StoreContext";
import getTimeDifference from "../../utils/timeDifference";
import axios from "axios";
import { FaArrowLeftLong } from "react-icons/fa6";

const JobPage = () => {
  const { url, candidateProfileData } = useContextProvider();
  const { id } = useParams(); // Retrieves job ID from URL
  const [job, setJob] = useState(null);
  const navigate = useNavigate();

  const applyHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${url}/api/application/apply`, {
        jobId: id,
        type:"Job",
        candidateId: candidateProfileData._id,
      }, {
        headers:{
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type' : 'application/json'
        }
      });
      
      if(response.status === 201){
        navigate("/jobs")
        toast.success('Application submitted successfully');
      }
    } catch (error) {
      console.error(error);
      const errorMessage = error.response?.data?.message || 'An unexpected error occurred';
      toast.error(errorMessage);
    }
  }

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await axios.get(`${url}/api/opportunity/jobs/${id}`, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.status === 200) {
          setJob(response.data);
        }
      } catch (error) {
        console.log(error);
        toast.error(error);
      }
    };

    fetchJob();
  }, [id]);

  if (!job) return <div>Loading...</div>;

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center p-6">
      <button
        onClick={() => navigate(-1)}
        className="absolute top-[100px] left-6 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <FaArrowLeftLong />
      </button>

      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="p-6">
          <div className="flex items-center mb-6">
            <img
              src={`${url}/logo/${job.companyLogo}`}
              alt={`${job.companyName} Logo`}
              className="w-16 h-16 rounded-full mr-4 mb-12"
            />
            <div>
              <h1 className="text-3xl font-bold text-blue-600 mb-2">{job.title}</h1>
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">{job.company}</h2>
              <p className="text-gray-600 mb-4">{job.location || "Remote"}</p>
            </div>
          </div>

          <div className="mb-6">
            <div className="flex flex-wrap gap-4 mb-6">
              <span className="bg-blue-100 text-blue-600 text-lg font-medium px-4 py-2 rounded-full">
                {job.jobType}
              </span>
              <span className="bg-green-100 text-green-600 text-lg font-medium px-4 py-2 rounded-full">
                ₹{job.salary} LPA
              </span>
              <span className="bg-red-100 text-red-600 text-lg font-medium px-4 py-2 rounded-full">
                {getTimeDifference(job.createdAt)}
              </span>
              <span className="bg-yellow-100 text-yellow-600 text-lg font-medium px-4 py-2 rounded-full">
                {job.experience} years experience
              </span>
            </div>
            <span className="text-black bg-gray-200 mb-2 text-md text-[14px] px-3 py-2 rounded-xl">
              Apply By: {new Date(job.applyBy).toLocaleDateString()}
            </span>
          </div>

          <div className="mb-6">
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">About the Job</h3>
            <p className="text-gray-700 mb-4">{job.description}</p>

            <div className="flex flex-col gap-4 mb-6">
              <div>
                <h4 className="text-xl font-semibold text-gray-800 mb-2">Skills Required</h4>
                <ul className="list-disc pl-5 text-gray-600">
                  {job.skills && job.skills.map((skill, index) => (
                    <li key={index}>{skill}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-xl font-semibold text-gray-800 mb-2">Number of Openings</h4>
                <p className="text-gray-700">{job.numberOfOpenings}</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-200 p-4 rounded-lg mb-6">
            <p className="text-gray-700 text-lg">
              <strong>Number of Applicants:</strong> {job.applications.length}
            </p>
          </div>

          <div className="mb-6">
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">About the Company</h3>
            <p className="text-gray-700 mb-4">{job.about}</p>
          </div>

          <div className="flex flex-col gap-4 mb-6">
            <button onClick={applyHandler} className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
              Apply Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobPage;
