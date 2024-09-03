import React, {useEffect, useState} from "react";
import { BrowserRouter as Router, Routes, Route, Link, NavLink } from 'react-router-dom';

import "./header.css";

export default function Header() {
    const token = document.cookie.split("authToken=")[1];
    let nav = (window.innerWidth > 500? true: false)
    const [navMenu, setNavMenu] = useState(nav);
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    function toggleShowProfileMenu() {
        setShowProfileMenu((prev) => !prev);
    }
    useEffect(() => {
        if(!nav)return;
        if(showProfileMenu) {
            document.querySelector(".drop-down-icon").style.transform = "rotate(180deg)";
        }
        else{
            setNavMenu(false);
            document.querySelector(".drop-down-icon").style.transform = "rotate(0deg)";
        }
    }, [showProfileMenu])
    function toggleNav() {
        setNavMenu((prev) => !prev);
        if(!navMenu) setShowProfileMenu(false);
    }
    const user = JSON.parse(localStorage.getItem("user"));
    const [profilePhotoUrl, setProfilePhotoUrl] = useState("/src/assets/profile-photo-jolder.jpg");
    const userProfileURL = `/${user.userName}/profile`;
    const [query, setQuery] = useState("");
    const [searchResult, setSearchResult] = useState([])
    useEffect(() => {
        if (user.profilePhotoUrl) {
            setProfilePhotoUrl(user.profilePhotoUrl);
        }
    }, [user])
    const handleSearch = async () => {
        if (query.trim() === "") return;
        await searchUsers();
    };
    async function searchUsers() {
        try {
            const response = await fetch(`http://localhost:4000/users/search?search=${query}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });
            const data = await response.json();
            if(data.length == 0) {
                setSearchResult([{name : "No Results", userID: 0}]);
                return;
            }
            setSearchResult(data);
        } catch (error) {
            console.error(error);
        }
    }
    return (
        <header className="header">
            <div className="logo-search-container">
                <div className="logo">
                    <i className="fa-solid fa-m"></i>
                    <i className="fa-solid fa-o"></i>
                    <i className="fa-solid fa-k"></i>
                    <i className="fa-solid fa-a"></i>
                </div>
                <div className="search-bar">
                    <input
                        type="search"
                        value={query}
                        onChange={(e) => {
                            setQuery(e.target.value)
                            setSearchResult([]);
                        }}
                        placeholder="Find friends"
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                handleSearch(); // Search on Enter key press
                            }
                        }}
                    />
                    <div className="search-result">
                        {searchResult && searchResult.map((user) => (
                            <div className="search-item" key={user.userID} onClick={()=>{
                                const url = `/${user.userName}/profile`;
                                window.open(url, '_blank');
                            }}>
                                {user.userName && <img src="https://www.w3schools.com/howto/img_avatar.png" alt="profile" />}
                                <p>{user.name}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="nav-icon" onClick={toggleNav}>
                <i className="fa-solid fa-bars"/>
            </div>
            <div className="nav">

                {
                    navMenu && (
                    <ul className="nav-menu">
                        <NavLink to="/home" className="menu-item" onClick>
                            <i className="fa-solid fa-house"></i>
                            <p>Home</p>
                        </NavLink>
                        <li className="menu-item">
                            <i className="fa-solid fa-bell"></i>
                            <p>Updates</p>
                        </li>
                    </ul>)
                }
                <div className="user-profile-item"  onClick={toggleShowProfileMenu}>
                    <img src={profilePhotoUrl}/>
                    <p>{user.name}</p>
                    {nav && <i className="fa-solid fa-chevron-down drop-down-icon"></i>}
                    {showProfileMenu ?
                        <ul className="profile-menu">
                            <NavLink to={userProfileURL} className="profile-menu-item">
                                <i className="fa-solid fa-user"></i>
                                <p>Profile</p>
                            </NavLink>
                            <NavLink to="/settings" className="profile-menu-item">
                                <i className="fa-solid fa-gear"></i>
                                <p>Settings</p>
                            </NavLink>
                            <NavLink to="/" className="profile-menu-item">
                                <i className="fa-solid fa-sign-out"></i>
                                <p>Log Out</p>
                            </NavLink> 
                        </ul> :null}
                </div>
            </div>
        </header>
    );
}