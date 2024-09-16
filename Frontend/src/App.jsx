import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
// import { WebSocketContext } from './webSocket';
import Auth from './views/authView/auth';
import Home from "./views/homeView/Home";
import Profile from "./views/profileView/Profile";
import Header from "./components/header/header";
import Settings from './views/settingsView/settings';
import PostView from './views/postView/postView';

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
          <Route path="/post/:postID" element={<PostView/>} />
        </Routes>
      </main>
    </div>
  </Router>
  )
}

export default App
