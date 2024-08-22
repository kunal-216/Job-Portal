import React, {createContext, useContext, useState, useEffect} from 'react'

const StoreContext = createContext();

export const StoreContextProvider = ({children}) => {
    const [token, setToken] = useState(null);

    useEffect(()=>{
        async function loadData(){  
            if(localStorage.getItem("token")){
                setToken(localStorage.getItem("token"))
            }
        }
        loadData();
    },[])

    return (
        <StoreContext.Provider value={{token,setToken}}>
            {children}
        </StoreContext.Provider>
    )
}

export const useContextProvider = () => useContext(StoreContext);