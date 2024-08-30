import { useState } from 'react';
import { Sidebar } from '../../components/index';
import { useContextProvider } from '../../context/StoreContext';
import { FaUserEdit } from "react-icons/fa";
import { toast } from 'react-toastify';
import axios from 'axios';

const UpdateProfile = () => {

  const { url, profileData, setProfileData } = useContextProvider();

  const [image, setImage] = useState(null);
  const [resume, setResume] = useState(null);
  const [editState, setEditState] = useState(null);

  const saveData = async (e) => {
    e.preventDefault();
    const payload = new FormData();
    payload.append('name', profileData.name);
    payload.append('email', profileData.email);
    payload.append('gender', profileData.gender);
    payload.append('designation', profileData.designation);
    payload.append('bio', profileData.bio);
    if (image) payload.append('image', image);
    if (resume) payload.append('resume', resume);

    try {
      const response = await axios.put(`${url}/api/user/update`, payload, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
      });

      if (response.data.success) {
        toast.success("Profile Updated Successfully");
        setEditState(null);
        setProfileData(response.data.data);
        setImage(null);
        setResume(null);
      } else {
        toast.error("Failed to Update Profile");
        setEditState(null);
      }
    } catch (error) {
      toast.error("An error occurred while saving the profile data.");
      console.log(error)
      setEditState(null);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    } else {
      setImage(null);
    }
  };

  const handleResumeChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setResume(file);
    } else {
      setResume(null);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const handleImageClick = () => {
    document.getElementById('imageInput').click();
  };

  const handleResumeClick = () => {
    document.getElementById('resumeInput').click();
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col items-center p-6">
        <div className="w-full max-w-2xl"> 
          <div className="flex flex-col items-center mb-8">
            <header className='block bg-blue-600 text-white py-4 rounded-lg shadow-lg mb-6 px-[85px]'>
              <div className='container mx-auto text-center'>
                <h1 className='text-4xl font-extrabold'>Update Profile</h1>
              </div>
            </header>
            {editState !== "Edit" && (
              <FaUserEdit
                size={24}
                onClick={() => setEditState("Edit")}
                className="cursor-pointer text-blue-500 hover:text-blue-600"
              />
            )}
          </div>

          {profileData ? (
            <div className="w-full">
              <div
                className={`relative cursor-pointer mb-6 flex justify-center ${editState === "Edit" ? 'opacity-75' : ''}`}
                onClick={editState === "Edit" ? handleImageClick : null}
              >
                <img
                  src={`${url}/images/${profileData.image}`}
                  alt={profileData.name}
                  className="w-32 h-32 rounded-full object-cover border-2 border-gray-300"
                />
                <input
                  id="imageInput"
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={handleImageChange}
                />
              </div>

              <div className="space-y-6">
                <div className="flex space-x-4">
                  <div className="info flex-1"> 
                    <h3 className="text-lg font-medium">Full Name</h3>
                    <input
                      type="text"
                      value={profileData.name}
                      readOnly={editState !== "Edit"}
                      onChange={handleInputChange}
                      name="name"
                      className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-opacity-50 ${editState === "Edit" ? 'bg-gray-200' : 'bg-white'}`}
                    />
                  </div>
                  <div className="info flex-1"> 
                    <h3 className="text-lg font-medium">Gender</h3>
                    {editState !== "Edit" ?
                      <input
                        type="text"
                        value={profileData.gender}
                        readOnly
                        name="gender"
                        className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-opacity-50 ${editState === "Edit" ? 'bg-gray-200' : 'bg-white'}`}
                      /> :
                      <select
                        name="gender"
                        className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-opacity-50 ${editState === "Edit" ? 'bg-gray-200' : 'bg-white'}`}
                        onChange={handleInputChange}
                        value={profileData.gender}
                        required>
                        <option value="" disabled>Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                      </select>}
                  </div>
                </div>
                <div className="flex space-x-4">
                  <div className="info flex-1">
                    <h3 className="text-lg font-medium">Email</h3>
                    <input
                      type="email"
                      value={profileData.email}
                      readOnly={editState !== "Edit"}
                      onChange={handleInputChange}
                      name="email"
                      className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-opacity-50 ${editState === "Edit" ? 'bg-gray-200' : 'bg-white'}`}
                    />
                  </div>
                  <div className="info flex-1">
                    <h3 className="text-lg font-medium">Designation</h3>
                    {editState !== "Edit" ? <input
                      type="text"
                      value={profileData.designation}
                      readOnly
                      name="designation"
                      className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-opacity-50 ${editState === "Edit" ? 'bg-gray-200' : 'bg-white'}`}
                    /> :
                      <select
                        name="designation"
                        className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-opacity-50 ${editState === "Edit" ? 'bg-gray-200' : 'bg-white'}`}
                        onChange={handleInputChange}
                        value={profileData.designation}
                        required
                      >
                        <option value="" disabled>Select Role</option>
                        <option value="Candidate">Candidate</option>
                        <option value="Recruiter">Recruiter</option>
                      </select>}
                  </div>
                </div>
                <div className="info">
                  <h3 className="text-lg font-medium">Bio</h3>
                  <textarea
                    value={profileData.bio}
                    readOnly={editState !== "Edit"}
                    onChange={handleInputChange}
                    name="bio"
                    rows={3}
                    className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-opacity-50 ${editState === "Edit" ? 'bg-gray-200' : 'bg-white'}`}
                  />
                </div>
                <div className="info">
                  <h3 className="text-lg font-medium">Resume</h3>
                  <div className="flex items-center">
                    <input
                      id="resumeInput"
                      type="file"
                      accept=".pdf,.doc,.docx"
                      style={{ display: "none" }}
                      onChange={handleResumeChange}
                    />
                    {editState !== "Edit" ? (
                      <a
                        href={`${url}/resume/${profileData.resume}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline"
                      >
                        View Resume
                      </a>
                    ) : (
                      <button
                        onClick={handleResumeClick}
                        className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
                      >
                        Upload New Resume
                      </button>
                    )}
                  </div>
                </div>
                {editState === "Edit" && (
                  <button
                    onClick={saveData}
                    className="mt-4 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
                  >
                    Save Profile
                  </button>
                )}
              </div>
            </div>
          ) : (
            <p className="text-center">Loading profile data...</p>
          )}
        </div>
      </div>
    </div>

  );
};

export default UpdateProfile;
