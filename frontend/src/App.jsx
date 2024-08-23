import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Home, LoginSignup, Jobs, Connect, Contact, Internships, Dashboard, MyApplications, UpdateProfile, Profile, Resume, PostOpportunity, OpportunitiesPosted, Bookmarked } from "./pages/index"
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
          <Route path='/my-applications' element={<MyApplications />} />
          <Route path='/update-profile' element={<UpdateProfile />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/resume' element={<Resume />} />
          <Route path='/post-opportunity' element={<PostOpportunity />} />
          <Route path='/opportunities-posted' element={<OpportunitiesPosted />} />
          <Route path='/bookmarked' element={<Bookmarked />} />
        </Routes>
        <Footer />
      </StoreContextProvider>
    </div>
  )
}

export default App
