import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Home, LoginSignup, Jobs, Connect, Contact, Internships, Dashboard } from "./pages/index"
import { Navbar, Footer } from './components/index'
import { StoreContextProvider } from './context/StoreContext';

const App = () => {
  return (
    <div>
      <StoreContextProvider>
        <ToastContainer />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/user" element={<LoginSignup />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/connect" element={<Connect />} />
          <Route path="/internships" element={<Internships />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
        <Footer />
      </StoreContextProvider>
    </div>
  )
}

export default App
