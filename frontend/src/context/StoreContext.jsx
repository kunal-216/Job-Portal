import React, {createContext, useContext, useState} from 'react'

const StoreContext = createContext();

export const StoreContextProvider = ({children}) => {
    const [token, setToken] = useState("false");

    return (
        <StoreContext.Provider value={{token,setToken}}>
            {children}
        </StoreContext.Provider>
    )
}

export const useContextProvider = () => useContext(StoreContext);