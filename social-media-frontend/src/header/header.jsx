import React, {useState} from "react";
import { BrowserRouter as Router, Routes, Route, Link, NavLink } from 'react-router-dom';

import "./header.css";

export default function Header() {
    const token = document.cookie.split("authToken=")[1];
    let nav = (window.innerWidth > 500? true: false)
    const [navMenu, setNavMenu] = useState(nav);
    function toggleNav() {
        setNavMenu((prev) => !prev);
    }
    const user = JSON.parse(localStorage.getItem("user"));
    const userProfileURL = `/${user.userName}/profile`;
    const [query, setQuery] = useState("");
    const [searchResult, setSearchResult] = useState([])

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
                <i className="fa-brands fa-facebook"></i>
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
            {
                navMenu && (
                <ul className="nav-menu">
                    <NavLink to="/home" className="menu-item">
                        <i className="fa-solid fa-house"></i>
                        <p>Home</p>
                    </NavLink>
                    <NavLink to={userProfileURL} className="menu-item">
                        <i className="fa-solid fa-user"></i>
                        <p>Profile</p>
                    </NavLink>
                    <li className="menu-item">
                        <i className="fa-solid fa-bell"></i>
                        <p>Updates</p>
                    </li>
                </ul>)
            }
        </header>
    );
}