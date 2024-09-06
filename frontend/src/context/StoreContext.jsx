/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';

const StoreContext = createContext();

export const StoreContextProvider = ({ children }) => {

  const url = import.meta.env.VITE_API_URI;

  const [token, setToken] = useState(null);
  const [profileData, setProfileData] = useState(null);
  const [candidateProfileData, setCandidateProfileData] = useState(null);
  const [recruiterProfileData, setRecruiterProfileData] = useState(null);
  const [userDesignation, setUserDesignation] = useState("Candidate");
  const [internshipData, setInternshipData] = useState(null);
  const [jobData, setJobData] = useState(null);
  const [postedOpportunities, setPostedOpportunities] = useState(null);
  const [bookmarkData, setBookmarkData] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${url}/api/profile/user`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.data.success) {
        setProfileData(response.data.data);
        setUserDesignation(response.data.data.designation);
      } else if (response.data.tokenExpired) {
        logout();
        toast.error('Session expired. Please log in again.');
      } else {
        toast.error('Failed to fetch the user data.');
      }

    } catch (error) {
      if (error.response && error.response.status === 401) {
        logout();
        toast.error('Session expired. Please log in again.');
      } else {
        console.error('Error fetching data:', error);
        toast.error('An error occurred while fetching the user data.');
      }
    }
  };

  const fetchCandidateData = async () => {
    try {
      const response = await axios.get(`${url}/api/profile/candidate`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.data.success) {
        setCandidateProfileData(response.data.data);
      } else {
        toast.error(response.data.message || 'Failed to fetch user profile.');
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          logout();
          toast.error('Session expired. Please log in again.');
        } else {
          toast.error(`Error: ${error.response.data.message || 'Failed to fetch user profile.'}`);
        }
      } else {
        console.error('Error fetching user data:', error);
        toast.error('An unexpected error occurred.');
      }
    }
  };

  const fetchRecruiterData = async () => {
    try {
      const response = await axios.get(`${url}/api/profile/recruiter`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.status === 200) {
        setRecruiterProfileData(response.data.data);
      } else {
        console.error('Failed to fetch user profile:', response.data);
        toast.error('Failed to fetch user profile.');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      toast.error('An error occurred while fetching recruiter profile.');
    }
  };

  const fetchJobs = async () => {
    try {
      const response = await axios.get(`${url}/api/opportunity/get-jobs`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
      if (response.status === 201) {
        setJobData(response.data.data);
      } else {
        console.error('Failed to fetch jobs:', response.data);
        toast.error('Failed to fetch jobs.');
      }
    } catch (error) {
      toast.error(error)
      console.log(error);
    }
  }

  const fetchInternships = async () => {
    try {
      const response = await axios.get(`${url}/api/opportunity/get-internships`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })

      if (response.status === 201) {
        setInternshipData(response.data.data)
      } else {
        console.error('Failed to fetch internships:', response.data);
        toast.error('Failed to fetch internships.');
      }
    } catch (error) {
      toast.error(error)
      console.log(error);
    }
  }

  const fetchPostedOpportunities = async () => {
    const token = localStorage.getItem('token');
    if (!recruiterProfileData || !recruiterProfileData._id) {
      console.error('Recruiter profile data is not available');
      return;
    }
    const recruiterId = recruiterProfileData._id;
    try {
      const response = await axios.get(`${url}/api/opportunity/get-posted-opportunities/${recruiterId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        const data = response.data.data;
        if (data && data.jobs && data.internships) {
          setPostedOpportunities({ jobs: data.jobs, internships: data.internships });
        } else {
          console.error('No jobs or internships found in the response data');
          toast.error('No opportunities found.');
        }
      } else {
        console.error('Failed to fetch opportunities:', response.data);
        toast.error('Failed to fetch opportunities.');
      }
    } catch (error) {
      toast.error("Error fetching posted opportunities");
      console.error('Error fetching posted opportunities:', error);
    }
  };

  const getBookMarkedOpportunities = async () => {
    if (!candidateProfileData || !candidateProfileData._id) {
      console.error('Candidate profile data is not available');
      return;
    }
    const candidateId = candidateProfileData._id;
    try {
      const response = await axios.get(`${url}/api/bookmark/get-bookmarks/${candidateId}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (response.status === 200) {
        setBookmarkData(response.data.data);
      } else {
        console.error('Failed to fetch bookmarks:', response.data);
        toast.error('Failed to fetch bookmarks.');
      }
    } catch (error) {
      console.error("Error fetching bookmarks:", error);
      toast.error("Error fetching bookmarks");
    }
  };


  useEffect(() => {
    const loadData = () => {
      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        setToken(storedToken);
      }
    };
    loadData();
    fetchJobs();
    fetchInternships();
  }, []);

  useEffect(() => {
    if (token) {
      fetchData();
    }
  }, [token]);

  useEffect(() => {
    if (profileData) {
      if (profileData.designation === "Candidate") {
        fetchCandidateData();
      } else if (profileData.designation === "Recruiter") {
        fetchRecruiterData().then(() => {
          if (recruiterProfileData && recruiterProfileData._id) {
            fetchPostedOpportunities();
          }
        });
      }
    }
  }, [profileData, recruiterProfileData]);

  useEffect(() => {
    if (candidateProfileData && candidateProfileData._id) {
      getBookMarkedOpportunities();
    }
  }, [candidateProfileData]);

  const logout = () => {
    setToken(null);
    setProfileData(null);
    localStorage.removeItem('token');
  };

  return (
    <StoreContext.Provider value={{
      token, setToken,
      profileData, setProfileData,
      url, logout,
      userDesignation, setUserDesignation,
      candidateProfileData, recruiterProfileData,
      internshipData, jobData,
      postedOpportunities, setPostedOpportunities,
      bookmarkData, setBookmarkData
    }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useContextProvider = () => useContext(StoreContext);