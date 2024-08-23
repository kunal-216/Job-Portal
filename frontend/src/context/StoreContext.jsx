import React, {createContext, useContext, useState, useEffect} from 'react'
import { toast } from 'react-toastify';
import axios from "axios"

const StoreContext = createContext();

export const StoreContextProvider = ({children}) => {

    const url = import.meta.env.VITE_API_URL;
    
    const [token, setToken] = useState(null);
    const [profileData, setProfileData] = useState(null);

    const fetchData = async () => {
        try {
          const response = await axios.get(`${url}/api/user/profile`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          })
    
          if (response.data.success) {
            setProfileData(response.data.data);
          } else {
            toast.error('Failed to fetch the profile data.');
          }
    
        } catch (error) {
          console.error('Error fetching data:', error);
          toast.error('An error occurred while fetching the profile data.');
        }
      }
    

    useEffect(()=>{
        async function loadData(){  
            if(localStorage.getItem("token")){
                setToken(localStorage.getItem("token"))
            }
        }
        loadData();
        if (token) {
            fetchData();
          }
    },[token])

    return (
        <StoreContext.Provider value={{token,setToken, profileData, setProfileData, url}}>
            {children}
        </StoreContext.Provider>
    )
}

export const useContextProvider = () => useContext(StoreContext);