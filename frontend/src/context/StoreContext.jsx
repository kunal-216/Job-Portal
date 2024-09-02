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
        toast.error('Failed to fetch the profile data.');
      }

    } catch (error) {
      if (error.response && error.response.status === 401) {
        logout();
        toast.error('Session expired. Please log in again.');
      } else {
        console.error('Error fetching data:', error);
        toast.error('An error occurred while fetching the profile data.');
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
        console.log(response.data.data)
        toast.success("Candidate Profile Fetched Successfully");
      } else {
        toast.error(response.data.message || 'Failed to fetch candidate profile.');
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          logout();
          toast.error('Session expired. Please log in again.');
        } else {
          toast.error(`Error: ${error.response.data.message || 'Failed to fetch candidate profile.'}`);
        }
      } else {
        console.error('Error fetching candidate data:', error);
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
        toast.success("Recruiter Profile Fetched Successfully");
      } else {
        console.error('Failed to fetch recruiter profile:', response.data);
        toast.error('Failed to fetch recruiter profile.');
      }
    } catch (error) {
      console.error('Error fetching recruiter data:', error);
      toast.error('An error occurred while fetching recruiter profile.');
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
        fetchRecruiterData();
      }
    }
  }, [profileData]);


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
      candidateProfileData, recruiterProfileData
    }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useContextProvider = () => useContext(StoreContext);