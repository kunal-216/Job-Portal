import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from "./pages/Home/Home"
import Login from "./pages/Login/Login"
import Signup from "./pages/Signup/Signup"
import Profile from './pages/Profile/Profile'
import Jobs from './pages/Jobs/Jobs'
import Internships from './pages/Internships/Internships'
import Contact from './pages/Contact/Contact'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/internships" element={<Internships />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </div>
  )
}

export default App
