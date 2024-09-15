import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserEdit } from "react-icons/fa";
import { toast } from "react-toastify";
import axios from "axios";
import { Sidebar } from "../../components/index";
import { useContextProvider } from "../../context/StoreContext";

const UpdateProfile = () => {
  const {
    url,
    profileData,
    setProfileData,
    candidateProfileData,
    setCandidateProfileData,
    recruiterProfileData,
    setRecruiterProfileData
  } = useContextProvider();

  const navigate = useNavigate();
  const [editState, setEditState] = useState("View");
  const [image, setImage] = useState(null);
  const [companyLogo, setCompanyLogo] = useState(null);
  const [resume, setResume] = useState(null);
  const [data, setData] = useState({
    name: "",
    email: "",
    designation: "",
    age: "",
    gender: "",
    bio: "",
    university: "",
    skills: [],
    companyName: "",
    location: "",
    websiteOfCompany: "",
    aboutCompany: "",
  });

  useEffect(() => {
    if (profileData.designation === "Candidate") {
      setData({
        name: profileData.name,
        email: profileData.email,
        designation: profileData.designation,
        age: candidateProfileData?.age || "",
        gender: candidateProfileData?.gender || "",
        bio: candidateProfileData?.bio || "",
        university: candidateProfileData?.university || "",
        skills: candidateProfileData?.skills || [],
      });
    } else if (profileData.designation === "Recruiter") {
      setData({
        name: profileData.name,
        email: profileData.email,
        designation: profileData.designation,
        companyName: recruiterProfileData?.companyName || "",
        location: recruiterProfileData?.location || "",
        websiteOfCompany: recruiterProfileData?.websiteOfCompany || "",
        aboutCompany: recruiterProfileData?.aboutCompany || "",
      });
    }
  }, [profileData, candidateProfileData, recruiterProfileData]);

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const onChangeRecruiterValues = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  }

  const handleImageClick = () => {
    document.getElementById("imageInput").click();
  };

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleResume = () => {
    document.getElementById("resumeInput").click();
  };

  const handleResumeChange = (e) => {
    if (e.target.files[0]) {
      setResume(e.target.files[0]);
    }
  };

  const handleCompanyLogoClick = () => {
    document.getElementById("companyLogoInput").click();
  };

  const handleCompanyLogoChange = (e) => {
    if (e.target.files[0]) {
      setCompanyLogo(e.target.files[0]);
    }
  };

  const handleSkillChange = (e) => {
    const skills = e.target.value.split(',').map(skill => skill.trim());
    setData(prevData => ({ ...prevData, skills }));
  };

  const updateProfile = async (e) => {
    e.preventDefault();

    const formdata = new FormData();
    formdata.append("name", data.name);
    formdata.append("email", data.email);
    formdata.append("designation", data.designation);

    if (data.designation === "Candidate") {
      formdata.append("age", data.age);
      formdata.append("gender", data.gender);
      formdata.append("bio", data.bio);
      formdata.append("university", data.university);
      formdata.append("skills", JSON.stringify(data.skills));
      if (image) formdata.append("image", image);
      if (resume) formdata.append("resume", resume);
    } else if (data.designation === "Recruiter") {
      formdata.append("companyName", data.companyName);
      formdata.append("location", data.location);
      formdata.append("websiteOfCompany", data.websiteOfCompany);
      formdata.append("aboutCompany", data.aboutCompany);
      if (companyLogo) formdata.append("companyLogo", companyLogo);
      if (image) formdata.append("image", image);
    }

    try {
      const response = await axios.put(`${url}/api/profile/user`, formdata, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        }
      });

      if (response.status === 201) {
        const { userData, candidateData, recruiterData } = response.data;
        setProfileData(userData);
        if (candidateData && typeof setCandidateProfileData === 'function') {
          setCandidateProfileData(candidateData);
        }
        if (recruiterData && typeof setRecruiterProfileData === 'function') {
          setRecruiterProfileData(recruiterData);
        }

        toast.success("Profile Updated Successfully");
        setEditState("View");
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Internal Server Error");
    }
  };

  return (
    <div className="flex flex-col md:flex-row">
      <Sidebar />
      <div className="flex-1 flex flex-col items-center p-4 md:p-6">
        <header className='bg-blue-600 text-white py-3 md:py-4 px-4 md:px-6 rounded-lg shadow-lg mb-4 md:mb-6 w-full max-w-4xl'>
          <div className='container mx-auto text-center'>
            <h1 className='text-2xl md:text-3xl lg:text-4xl font-extrabold'>Update Profile</h1>
          </div>
        </header>
        <div className="flex justify-center mb-6 md:mb-8">
          <FaUserEdit
            size={24}
            onClick={() => setEditState(editState === "View" ? "Edit" : "View")}
            className="cursor-pointer text-blue-500 hover:text-blue-600"
          />
        </div>
        {profileData ? (
          <div className='w-full max-w-4xl bg-white shadow-md rounded-lg p-4 md:p-6 mb-5'>
            {data.designation === "Candidate" ? (
              <>
                <div className='flex justify-center mb-4 md:mb-6'>
                  <img
                    src={image ? URL.createObjectURL(image) : `${url}/images/${candidateProfileData?.image}`}
                    className='rounded-full w-24 h-24 md:w-32 md:h-32 object-cover cursor-pointer border border-neutral-700'
                    alt="Profile Image"
                    onClick={handleImageClick}
                  />
                  <input
                    id="imageInput"
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={handleImageChange}
                    disabled={editState === "View"}
                  />
                </div>
                <div className='space-y-4 md:space-y-6'>
                  <div className='flex flex-col'>
                    <label className='block text-sm font-medium text-gray-700'>Name</label>
                    <input
                      type='text'
                      name="name"
                      value={data.name}
                      onChange={onChangeHandler}
                      className={`mt-1 p-2 block w-full border border-gray-300 rounded-md ${editState === "View" ? 'bg-gray-200' : ''}`}
                      disabled={editState === "View"}
                    />
                  </div>
                  <div className='flex flex-col md:flex-row md:gap-6'>
                    <div className='flex flex-col w-full md:w-1/2'>
                      <label className='block text-sm font-medium text-gray-700'>Gender</label>
                      <input
                        type='text'
                        name="gender"
                        value={data.gender}
                        onChange={onChangeHandler}
                        className={`mt-1 p-2 block w-full border border-gray-300 rounded-md ${editState === "View" ? 'bg-gray-200' : ''}`}
                        disabled={editState === "View"}
                      />
                    </div>
                    <div className='flex flex-col w-full md:w-1/2 mt-4 md:mt-0'>
                      <label className='block text-sm font-medium text-gray-700'>Age</label>
                      <input
                        type='text'
                        name="age"
                        value={data.age}
                        onChange={onChangeHandler}
                        className={`mt-1 p-2 block w-full border border-gray-300 rounded-md ${editState === "View" ? 'bg-gray-200' : ''}`}
                        disabled={editState === "View"}
                      />
                    </div>
                  </div>
                  <div className='flex flex-col md:flex-row md:gap-6'>
                    <div className='flex flex-col w-full md:w-1/2'>
                      <label className='block text-sm font-medium text-gray-700'>Email</label>
                      <input
                        type='text'
                        name="email"
                        value={data.email}
                        onChange={onChangeHandler}
                        className={`mt-1 p-2 block w-full border border-gray-300 rounded-md ${editState === "View" ? 'bg-gray-200' : ''}`}
                        disabled={editState === "View"}
                      />
                    </div>
                    <div className='flex flex-col w-full md:w-1/2 mt-4 md:mt-0'>
                      <label className='block text-sm font-medium text-gray-700'>Designation</label>
                      <input
                        type='text'
                        value={profileData.designation}
                        className='mt-1 p-2 block w-full border border-gray-300 rounded-md bg-gray-200'
                        disabled
                      />
                    </div>
                  </div>
                  <div className='flex flex-col'>
                    <label className='block text-sm font-medium text-gray-700'>Bio</label>
                    <textarea
                      name="bio"
                      value={data.bio}
                      onChange={onChangeHandler}
                      className={`mt-1 p-2 block w-full border border-gray-300 rounded-md ${editState === "View" ? 'bg-gray-200' : ''}`}
                      disabled={editState === "View"}
                    />
                  </div>
                  <div className='flex flex-col'>
                    <label className='block text-sm font-medium text-gray-700'>Skills (comma-separated)</label>
                    <input
                      type='text'
                      name="skills"
                      value={data.skills.join(', ')}
                      onChange={handleSkillChange}
                      className={`mt-1 p-2 block w-full border border-gray-300 rounded-md ${editState === "View" ? 'bg-gray-200' : ''}`}
                      disabled={editState === "View"}
                    />
                  </div>
                  <div className='flex flex-col'>
                    <label className='block text-sm font-medium text-gray-700'>University</label>
                    <input
                      type='text'
                      name="university"
                      value={data.university}
                      onChange={onChangeHandler}
                      className={`mt-1 p-2 block w-full border border-gray-300 rounded-md ${editState === "View" ? 'bg-gray-200' : ''}`}
                      disabled={editState === "View"}
                    />
                  </div>
                  <div className='flex flex-col'>
                    <label className='block text-sm font-medium text-gray-700'>Resume</label>
                    <div className='flex items-center flex-wrap'>
                      <button
                        onClick={handleResume}
                        className={`px-4 py-2 bg-blue-500 text-white rounded-md ${editState === "View" ? 'opacity-50 cursor-not-allowed' : ''}`}
                        disabled={editState === "View"}
                      >
                        {resume ? 'Change Resume' : 'Upload Resume'}
                      </button>
                      {resume && <span className='ml-2 mt-2 md:mt-0'>{resume.name}</span>}
                    </div>
                    <input
                      id="resumeInput"
                      type="file"
                      accept=".pdf,.doc,.docx"
                      style={{ display: "none" }}
                      onChange={handleResumeChange}
                      disabled={editState === "View"}
                    />
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className='flex flex-col md:flex-row justify-center items-center gap-8 md:gap-20'>
                  <div className='flex flex-col items-center mb-4 md:mb-6'>
                    <img
                      src={image ? URL.createObjectURL(image) : `${url}/images/${recruiterProfileData?.image}`}
                      className='rounded-full w-24 h-24 md:w-32 md:h-32 object-cover cursor-pointer'
                      alt="Profile"
                      onClick={handleImageClick}
                    />
                    <input
                      id="imageInput"
                      type="file"
                      accept="image/*"
                      style={{ display: "none" }}
                      onChange={handleImageChange}
                      disabled={editState === "View"}
                    />
                  </div>
                  <div className='flex flex-col items-center mb-4 md:mb-6'>
                    <img
                      src={companyLogo ? URL.createObjectURL(companyLogo) : `${url}/logo/${recruiterProfileData?.companyLogo}`}
                      className='rounded-full w-24 h-24 md:w-32 md:h-32 object-cover cursor-pointer'
                      alt="Company Logo"
                      onClick={handleCompanyLogoClick}
                    />
                    <input
                      id="companyLogoInput"
                      type="file"
                      accept="image/*"
                      style={{ display: "none" }}
                      onChange={handleCompanyLogoChange}
                      disabled={editState === "View"}
                    />
                  </div>
                </div>
                <div className='space-y-4 md:space-y-6'>
                  <div className='flex flex-col'>
                    <label className='block text-sm font-medium text-gray-700'>Name</label>
                    <input
                      type='text'
                      name="name"
                      value={data.name}
                      onChange={onChangeRecruiterValues}
                      className={`mt-1 p-2 block w-full border border-gray-300 rounded-md ${editState === "View" ? 'bg-gray-200' : ''}`}
                      disabled={editState === "View"}
                    />
                  </div>
                  <div className='flex flex-col md:flex-row md:gap-6'>
                    <div className='flex flex-col w-full md:w-1/2'>
                      <label className='block text-sm font-medium text-gray-700'>Email</label>
                      <input
                        type='text'
                        name="email"
                        value={data.email}
                        onChange={onChangeHandler}
                        className={`mt-1 p-2 block w-full border border-gray-300 rounded-md ${editState === "View" ? 'bg-gray-200' : ''}`}
                        disabled={editState === "View"}
                      />
                    </div>
                    <div className='flex flex-col w-full md:w-1/2 mt-4 md:mt-0'>
                      <label className='block text-sm font-medium text-gray-700'>Designation</label>
                      <input
                        type='text'
                        value={profileData.designation}
                        className='mt-1 p-2 block w-full border border-gray-300 rounded-md bg-gray-200'
                        disabled
                      />
                    </div>
                  </div>
                  <div className='flex flex-col md:flex-row md:gap-6'>
                    <div className='flex flex-col w-full md:w-1/2'>
                      <label className='block text-sm font-medium text-gray-700'>Company Name</label>
                      <input
                        type='text'
                        name="companyName"
                        value={data.companyName}
                        onChange={onChangeHandler}
                        className={`mt-1 p-2 block w-full border border-gray-300 rounded-md ${editState === "View" ? 'bg-gray-200' : ''}`}
                        disabled={editState === "View"}
                      />
                    </div>
                    <div className='flex flex-col w-full md:w-1/2 mt-4 md:mt-0'>
                      <label className='block text-sm font-medium text-gray-700'>Company Location</label>
                      <input
                        type='text'
                        name="location"
                        value={data.location}
                        onChange={onChangeHandler}
                        className={`mt-1 p-2 block w-full border border-gray-300 rounded-md ${editState === "View" ? 'bg-gray-200' : ''}`}
                        disabled={editState === "View"}
                      />
                    </div>
                  </div>
                  <div className='flex flex-col'>
                    <label className='block text-sm font-medium text-gray-700'>About the company</label>
                    <textarea
                      name="aboutCompany"
                      value={data.aboutCompany}
                      onChange={onChangeHandler}
                      className={`mt-1 p-2 block w-full border border-gray-300 rounded-md ${editState === "View" ? 'bg-gray-200' : ''}`}
                      disabled={editState === "View"}
                    />
                  </div>
                  <div className='flex flex-col'>
                    <label className='block text-sm font-medium text-gray-700'>Website of the company</label>
                    <input
                      type='text'
                      name="websiteOfCompany"
                      value={data.websiteOfCompany}
                      onChange={onChangeHandler}
                      className={`mt-1 p-2 block w-full border border-gray-300 rounded-md ${editState === "View" ? 'bg-gray-200' : ''}`}
                      disabled={editState === "View"}
                    />
                  </div>
                </div>
              </>
            )}
            {editState === "Edit" && (
              <div className="mt-6 flex flex-col sm:flex-row gap-4">
                <button
                  onClick={updateProfile}
                  className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors w-full sm:w-auto">
                  Update Profile
                </button>
                <button
                  onClick={() => setEditState("View")}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors w-full sm:w-auto">
                  Cancel
                </button>
              </div>
            )}
          </div>
        ) : (
          <p className='text-gray-600'>Loading profile data...</p>
        )}
      </div>
    </div>
  );
};

export default UpdateProfile;