import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
// import { WebSocketContext } from './webSocket';
import Auth from './routes/auth';
import Home from "./routes/Home";
import Profile from "./routes/Profile";
import Header from "./header/header";
import Settings from './routes/settings';
function App(){
  
  return (
    <Router id="app">
    <div>
      <Header /> {/* Header will appear at the top of all views */}
      <main>
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route path="/home" element={<Home />} />
          <Route path="/:userName/profile" element={<Profile/>} />
          <Route path="/settings" element={<Settings/>} />
        </Routes>
      </main>
    </div>
  </Router>
  )
}

export default App
