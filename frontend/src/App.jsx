import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from "./pages/Home/Home"
import LoginSignup from "./pages/LoginSignup/LoginSignup"
import Profile from './pages/Profile/Profile'
import Jobs from './pages/Jobs/Jobs'
import Internships from './pages/Internships/Internships'
import Contact from './pages/Contact/Contact'
import Dashboard from './pages/Dashboard/Dashboard'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user" element={<LoginSignup />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/internships" element={<Internships />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
