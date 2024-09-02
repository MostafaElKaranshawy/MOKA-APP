import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'

import Auth from './routes/auth';
import Home from "./routes/Home";
import Profile from "./routes/Profile";
function App(){
  return (
    <Router id="app">
      <Routes>
          <Route path="/" element={<Auth />} />
          <Route path="/home" element={<Home />} />
          <Route path="/:userName/profile" element={<Profile/>} />
      </Routes>
    </Router>
  )
}

export default App
