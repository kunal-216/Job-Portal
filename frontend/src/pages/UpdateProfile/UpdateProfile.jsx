// import { useState } from 'react';
// import { Sidebar } from '../../components/index';
// import { useContextProvider } from '../../context/StoreContext';
// import { FaUserEdit } from "react-icons/fa";
// import { toast } from 'react-toastify';
// import axios from 'axios';

// const UpdateProfile = () => {
//   const {
//     url, profileData, setProfileData, userDesignation,
//     candidateProfileData, recruiterProfileData,
//     setCandidateProfileData, setRecruiterProfileData,
//     debouncedHandleInputChange
//   } = useContextProvider();

//   const [image, setImage] = useState(null);
//   const [resume, setResume] = useState(null);
//   const [companyLogo, setCompanyLogo] = useState(null);
//   const [editState, setEditState] = useState(null);

//   const saveData = async (e) => {
//     e.preventDefault();
//     const payload = new FormData();
//     payload.append('name', profileData.name);
//     payload.append('email', profileData.email);
//     payload.append('designation', profileData.designation);

//     if (userDesignation === "Candidate") {
//       payload.append('age', candidateProfileData.age);
//       payload.append('gender', candidateProfileData.gender);
//       payload.append('bio', candidateProfileData.bio);
//       payload.append('university', candidateProfileData.university);
//       payload.append('skills', candidateProfileData.skills);
//       if (resume) payload.append('resume', resume);
//     } else if (userDesignation === "Recruiter") {
//       payload.append('companyName', recruiterProfileData.companyName);
//       payload.append('location', recruiterProfileData.location);
//       if (companyLogo) payload.append('companyLogo', companyLogo);
//     }

//     if (image) payload.append('image', image);

//     try {
//       const response = await axios.put(`${url}/api/profile/user`, payload, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//           'Authorization': `Bearer ${localStorage.getItem('token')}`
//         },
//       });

//       if (response.data.success) {
//         toast.success("Profile Updated Successfully");
//         setEditState(null);
//         setProfileData(response.data.data);

//         if (userDesignation === "Candidate") {
//           setCandidateProfileData(response.data.data);
//         } else if (userDesignation === "Recruiter") {
//           setRecruiterProfileData(response.data.data);
//         }

//         setImage(null);
//         setResume(null);
//         setCompanyLogo(null);
//       } else {
//         toast.error("Failed to Update Profile");
//         setEditState(null);
//       }
//     } catch (error) {
//       toast.error("An error occurred while saving the profile data.");
//       console.error("Error updating profile:", error);
//       setEditState(null);
//     }
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     setImage(file || null);
//   };

//   const handleResumeChange = (e) => {
//     const file = e.target.files[0];
//     setResume(file || null);
//   };

//   const handleCompanyLogoChange = (e) => {
//     const file = e.target.files[0];
//     setCompanyLogo(file || null);
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     debouncedHandleInputChange(name, value);
//     if (userDesignation === "Candidate") {
//       setCandidateProfileData(prevState => ({ ...prevState, [name]: value }));
//     } else if (userDesignation === "Recruiter") {
//       setRecruiterProfileData(prevState => ({ ...prevState, [name]: value }));
//     }
//     setProfileData(prevState => ({ ...prevState, [name]: value }));
//   };

//   const handleImageClick = () => {
//     document.getElementById('imageInput').click();
//   };

//   const handleCompanyLogoClick = () => {
//     document.getElementById('companyLogoInput').click();
//   };

//   return (
//     <div className="flex min-h-screen bg-gray-100">
//       <Sidebar />
//       <div className="flex-1 flex flex-col p-6 bg-gray-100">
//         <div className="w-full max-w-2xl mx-auto">
//           <header className='bg-blue-600 text-white py-4 rounded-lg shadow-lg mb-8'>
//             <div className='container mx-auto text-center'>
//               <h1 className='text-4xl font-extrabold'>Update Profile</h1>
//             </div>
//           </header>
//           <div className="flex justify-center mb-8">
//             {editState !== "Edit" && (
//               <FaUserEdit
//                 size={24}
//                 onClick={() => setEditState("Edit")}
//                 className="cursor-pointer text-blue-500 hover:text-blue-600"
//               />
//             )}
//           </div>

//           {profileData ? (
//             <div className="w-full">
//               <div className='flex flex-row justify-center items-center gap-10'>
//                 <div
//                   className={`relative cursor-pointer mb-6 flex justify-center ${editState === "Edit" ? 'opacity-75' : ''}`}
//                   onClick={editState === "Edit" ? handleImageClick : null}>
//                   <img
//                     src={`${url}/images/${userDesignation === "Candidate" ? candidateProfileData.image : recruiterProfileData.image}`}
//                     alt={profileData.name}
//                     className="w-32 h-32 rounded-full object-cover border-2 border-gray-300"
//                   />
//                   <input
//                     id="imageInput"
//                     type="file"
//                     accept="image/*"
//                     style={{ display: "none" }}
//                     onChange={handleImageChange}
//                   />
//                 </div>
//                 {userDesignation === "Recruiter" && (
//                   <div
//                     className={`relative cursor-pointer mb-6 flex justify-center ${editState === "Edit" ? 'opacity-75' : ''}`}
//                     onClick={editState === "Edit" ? handleCompanyLogoClick : null}
//                   >
//                     <img
//                       src={`${url}/logo/${recruiterProfileData.companyLogo}`}
//                       alt={recruiterProfileData.companyName}
//                       className="w-32 h-32 rounded-full object-cover border-2 border-gray-300"
//                     />
//                     <input
//                       id="companyLogoInput"
//                       type="file"
//                       accept="image/*"
//                       style={{ display: "none" }}
//                       onChange={handleCompanyLogoChange}
//                     />
//                   </div>
//                 )}
//               </div>
//               <div className="space-y-6">
//                 <div className="space-y-4">
//                   <div className="info">
//                     <h3 className="text-lg font-medium">Full Name</h3>
//                     <input
//                       type="text"
//                       value={profileData.name}
//                       readOnly={editState !== "Edit"}
//                       onChange={handleInputChange}
//                       name="name"
//                       className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-opacity-50 ${editState === "Edit" ? 'bg-gray-200' : 'bg-white'}`}
//                     />
//                   </div>
//                   <div className="info">
//                     <h3 className="text-lg font-medium">Gender</h3>
//                     {editState !== "Edit" ? (
//                       <input
//                         type="text"
//                         value={userDesignation === "Candidate" ? candidateProfileData.gender : recruiterProfileData.gender}
//                         readOnly
//                         name="gender"
//                         className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm bg-white"
//                       />
//                     ) : (
//                       <select
//                         name="gender"
//                         value={userDesignation === "Candidate" ? candidateProfileData.gender : recruiterProfileData.gender}
//                         onChange={handleInputChange}
//                         className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm"
//                       >
//                         <option value="Male">Male</option>
//                         <option value="Female">Female</option>
//                         <option value="Other">Other</option>
//                       </select>
//                     )}
//                   </div>
//                 </div>
//                 {userDesignation === "Candidate" && (
//                   <>
//                     <div className="info">
//                       <h3 className="text-lg font-medium">Age</h3>
//                       <input
//                         type="text"
//                         value={candidateProfileData.age}
//                         readOnly={editState !== "Edit"}
//                         onChange={handleInputChange}
//                         name="age"
//                         className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-opacity-50 ${editState === "Edit" ? 'bg-gray-200' : 'bg-white'}`}
//                       />
//                     </div>
//                     <div className="info">
//                       <h3 className="text-lg font-medium">Bio</h3>
//                       <textarea
//                         value={candidateProfileData.bio}
//                         readOnly={editState !== "Edit"}
//                         onChange={handleInputChange}
//                         name="bio"
//                         className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-opacity-50 ${editState === "Edit" ? 'bg-gray-200' : 'bg-white'}`}
//                       />
//                     </div>
//                     <div className="info">
//                       <h3 className="text-lg font-medium">University</h3>
//                       <input
//                         type="text"
//                         value={candidateProfileData.university}
//                         readOnly={editState !== "Edit"}
//                         onChange={handleInputChange}
//                         name="university"
//                         className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-opacity-50 ${editState === "Edit" ? 'bg-gray-200' : 'bg-white'}`}
//                       />
//                     </div>
//                     <div className="info">
//                       <h3 className="text-lg font-medium">Skills</h3>
//                       <input
//                         type="text"
//                         value={candidateProfileData.skills}
//                         readOnly={editState !== "Edit"}
//                         onChange={handleInputChange}
//                         name="skills"
//                         className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-opacity-50 ${editState === "Edit" ? 'bg-gray-200' : 'bg-white'}`}
//                       />
//                     </div>
//                     <div className="info">
//                       <h3 className="text-lg font-medium">Resume</h3>
//                       {editState === "Edit" ? (
//                         <>
//                           <input
//                             type="file"
//                             accept=".pdf"
//                             onChange={handleResumeChange}
//                             className="mt-1 block w-full"
//                           />
//                         </>
//                       ) : (
//                         <a
//                           href={`${url}/files/${candidateProfileData.resume}`}
//                           target="_blank"
//                           rel="noopener noreferrer"
//                           className="text-blue-600"
//                         >
//                           View Resume
//                         </a>
//                       )}
//                     </div>
//                   </>
//                 )}

//                 {userDesignation === "Recruiter" && (
//                   <>
//                     <div className="info">
//                       <h3 className="text-lg font-medium">Company Name</h3>
//                       <input
//                         type="text"
//                         value={recruiterProfileData.companyName}
//                         readOnly={editState !== "Edit"}
//                         onChange={handleInputChange}
//                         name="companyName"
//                         className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-opacity-50 ${editState === "Edit" ? 'bg-gray-200' : 'bg-white'}`}
//                       />
//                     </div>
//                     <div className="info">
//                       <h3 className="text-lg font-medium">Location</h3>
//                       <input
//                         type="text"
//                         value={recruiterProfileData.location}
//                         readOnly={editState !== "Edit"}
//                         onChange={handleInputChange}
//                         name="location"
//                         className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-opacity-50 ${editState === "Edit" ? 'bg-gray-200' : 'bg-white'}`}
//                       />
//                     </div>
//                   </>
//                 )}

//                 {editState === "Edit" && (
//                   <button
//                     onClick={saveData}
//                     className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
//                   >
//                     Save
//                   </button>
//                 )}
//               </div>
//             </div>
//           ) : (
//             <p>Loading...</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UpdateProfile;

const UpdateProfile = () => {
  return (
    <div>
      
    </div>
  )
}

export default UpdateProfile
