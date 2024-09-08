/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useContextProvider } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const InternshipPage = () => {
  const { url } = useContextProvider();
  const { id } = useParams(); // useParams for retrieving id from URL
  const [internship, setInternship] = useState(null);
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchInternship = async () => {
      try {
        const response = await axios.get(`${url}/api/opportunity/internships/${id}`, {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`
          }
        });
        if (response.status === 200) {
          setInternship(response.data);
        } else {
          toast.error("Failed to fetch Opportunity details");
        }
      } catch (error) {
        console.log(error);
        toast.error("Error fetching data");
      }
    };
    fetchInternship();
  }, [id]);

  if (!internship) return <div>Loading...</div>;

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center p-6">
      <button
        onClick={() => navigate(-1)}
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-6"
      >
        Back
      </button>

      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="p-6">
          {internship.companyLogo && (
            <img src={internship.companyLogo} alt={internship.companyName} className="w-24 h-24 object-cover rounded-full mx-auto" />
          )}
          
          <h1 className="text-3xl font-extrabold text-gray-900 mt-4">{internship.title}</h1>

          <p className="text-xl font-medium text-gray-700 mt-2">{internship.companyName}</p>

          <div className="mt-4">
            <span className="bg-blue-100 text-blue-600 text-sm font-medium px-3 py-1 rounded-full">{internship.opportunityType}</span>
          </div>

          <div className="mt-2">
            <span className="bg-gray-100 text-gray-600 text-sm font-medium px-3 py-1 rounded-full">{internship.location}</span>
          </div>

          <div className="mt-2">
            <span className="bg-green-100 text-green-600 text-sm font-medium px-3 py-1 rounded-full">₹{internship.salary}</span>
          </div>

          <div className="mt-2">
            <span className="bg-indigo-100 text-indigo-600 text-sm font-medium px-3 py-1 rounded-full">{internship.type}</span>
          </div>

          <div className="mt-2">
            <span className="bg-yellow-100 text-yellow-600 text-sm font-medium px-3 py-1 rounded-full">Start Date: {new Date(internship.startDate).toLocaleDateString()}</span>
          </div>

          <div className="mt-2">
            <span className="bg-red-100 text-red-600 text-sm font-medium px-3 py-1 rounded-full">Apply By: {new Date(internship.applyBy).toLocaleDateString()}</span>
          </div>

          <div className="mt-2">
            <span className="bg-gray-200 text-gray-700 text-sm font-medium px-3 py-1 rounded-full">{internship.postedTime}</span>
          </div>

          <div className="mt-2">
            <span className="bg-purple-100 text-purple-600 text-sm font-medium px-3 py-1 rounded-full">{internship.applicants} Applicants</span>
          </div>

          <div className="mt-4">
            <h2 className="text-xl font-bold text-gray-900">About the Internship</h2>
            <p className="mt-2 text-gray-700">{internship.description}</p>
          </div>

          <div className="mt-4">
            <h3 className="text-lg font-semibold text-gray-800">Key Responsibilities</h3>
            <ul className="list-disc pl-5 mt-2 text-gray-700">
              {internship.keyResponsibilities.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="mt-4">
            <h3 className="text-lg font-semibold text-gray-800">Qualifications</h3>
            <ul className="list-disc pl-5 mt-2 text-gray-700">
              {internship.qualifications.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="mt-4">
            <h3 className="text-lg font-semibold text-gray-800">Skills Required</h3>
            <ul className="list-disc pl-5 mt-2 text-gray-700">
              {internship.skillsRequired.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="mt-4">
            <span className="bg-green-100 text-green-600 text-sm font-medium px-3 py-1 rounded-full">Openings: {internship.numberOfOpenings}</span>
          </div>

          <div className="mt-4">
            <h2 className="text-xl font-bold text-gray-900">About the Company</h2>
            <p className="mt-2 text-gray-700">{internship.companyAbout}</p>
            {internship.companyWebsite && (
              <a href={internship.companyWebsite} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline mt-2 block">
                Visit Company Website
              </a>
            )}
          </div>

          <div className="flex flex-col gap-4 mb-6">
            <button className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
              Apply Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InternshipPage;
