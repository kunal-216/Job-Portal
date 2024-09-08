/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { toast } from "react-toastify"
import { useContextProvider } from "../../context/StoreContext"
import getTimeDifference from "../../utils/timeDifference"
import axios from "axios"

const JobPage = () => {


  const { url } = useContextProvider();

  const { id } = useParams(); // this useParams is used for retrieving id from the url like /jobs/:id
  const [job, setJob] = useState(null);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await axios.get(`${url}/api/opportunity/${id}`, {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`
          }
        })
        if (response.status === 200) {
          setJob(response.data)
        } else {
          toast.error("Failed to fetch Opportunity details")
        }
      } catch (error) {
        console.log(error);
        toast.error(error);
      }
    }
    fetchJob();
  }, [id])

  if (!job) return <div>Loading...</div>;

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center p-6">
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="p-6">
          <div className="flex items-center mb-6">
            <img
              src={job.companyLogo}
              alt={`${job.companyName} Logo`}
              className="w-16 h-16 rounded-full mr-4"
            />
            <div>
              <h1 className="text-4xl font-bold text-blue-600 mb-2">{job.title}</h1>
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">{job.companyName}</h2>
              <p className="text-gray-600 mb-4">{job.location}</p>
            </div>
          </div>

          <div className="mb-6">
            <div className="flex flex-wrap gap-4 mb-4">
              <span className="bg-blue-100 text-blue-600 text-lg font-medium px-4 py-2 rounded-full">
                {job.opportunityType}
              </span>
              <span className="bg-green-100 text-green-600 text-lg font-medium px-4 py-2 rounded-full">
                ₹{job.salary}
              </span>
              <span className="bg-gray-100 text-gray-600 text-lg font-medium px-4 py-2 rounded-full">
                {job.experience} Experience
              </span>
              <span className="bg-yellow-100 text-yellow-600 text-lg font-medium px-4 py-2 rounded-full">
                Start Date: {new Date(job.startDate).toLocaleDateString()}
              </span>
              <span className="bg-red-100 text-red-600 text-lg font-medium px-4 py-2 rounded-full">
                Apply By: {new Date(job.applyBy).toLocaleDateString()}
              </span>
            </div>
            <p className="text-gray-600 mb-4 text-lg">
              Posted {getTimeDifference(job.createdAt)}
            </p>
          </div>

          <div className="mb-6">
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">About the Job</h3>
            <p className="text-gray-700 mb-4">{job.description}</p>
            <div className="flex flex-col gap-4 mb-6">
              <div>
                <h4 className="text-xl font-semibold text-gray-800 mb-2">Key Responsibilities</h4>
                <ul className="list-disc pl-5 text-gray-600">
                  {job.keyResponsibilities.map((responsibility, index) => (
                    <li key={index}>{responsibility}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-xl font-semibold text-gray-800 mb-2">Qualifications</h4>
                <ul className="list-disc pl-5 text-gray-600">
                  {job.qualifications.map((qualification, index) => (
                    <li key={index}>{qualification}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-xl font-semibold text-gray-800 mb-2">Skills Required</h4>
                <ul className="list-disc pl-5 text-gray-600">
                  {job.skillsRequired.map((skill, index) => (
                    <li key={index}>{skill}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-xl font-semibold text-gray-800 mb-2">Number of Openings</h4>
                <p className="text-gray-700">{job.noOfOpenings}</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-200 p-4 rounded-lg">
            <p className="text-gray-700 text-lg">
              <strong>Number of Applicants:</strong> {job.applicants}
            </p>
          </div>

          <div className="mb-6">
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">About the Company</h3>
            <p className="text-gray-700 mb-4">{job.companyAbout}</p>
            <a
              href={job.companyWebsite}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline hover:text-blue-600"
            >
              Visit Company Website
            </a>
          </div>

          <div className="flex flex-col gap-4 mb-6">
            <button className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
              Apply Now
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default JobPage
