import React, {useEffect, useState, useRef} from "react";
import { BrowserRouter as NavLink } from 'react-router-dom';
import "./header.css";
import { signOut } from "../../services/authRequests";
import {searchUsers} from '../../services/userRequests'
export default function Header() {
    const token = document.cookie.split("authToken=")[1];
    let nav = (window.innerWidth > 500? true: false)
    const [search, setsearch] = useState(true);
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const authWindow = (window.location.href == "http://localhost:5173/" ? true : false);

    useEffect(() => {
        if(authWindow)return
        setsearch(nav);
    }, [nav])
    function toggleShowProfileMenu() {
        setShowProfileMenu((prev) => !prev);
    }
    useEffect(() => {
        if(!nav || authWindow)return;
        if(showProfileMenu) {
            document.querySelector(".drop-down-icon").style.transform = "rotate(180deg)";
        }
        else{
            document.querySelector(".drop-down-icon").style.transform = "rotate(0deg)";
        }
    }, [showProfileMenu])
    function toggleSearch() {
        setsearch((prev) => !prev);
        if(!search) setShowProfileMenu(false);
    }
    let [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
    const [profilePhotoUrl, setProfilePhotoUrl] = useState("/src/assets/profile-photo-jolder.jpg");
    const [query, setQuery] = useState("");
    const [searchResult, setSearchResult] = useState([])
    const handleStorageChange = () => {
        setUser(JSON.parse(localStorage.getItem("user")));
    }
    useEffect(() => {
        if (!authWindow && user.profilePhotoUrl) {
            setProfilePhotoUrl(user.profilePhotoUrl);
            console.log(user.profilePhotoUrl);
        }
        window.addEventListener('storage', handleStorageChange);
    }, [user])
    const handleSearch = async () => {
        if (query.trim() === "") return;
        await handleSearchUsers();
    };
    async function handleLogOut() {
        try {
            const data = await signOut(token);
            if (data === "Logged out") {
                localStorage.removeItem("user");
                document.cookie = "authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                window.location.href = "/";
            }
        } catch (error) {
            console.error(error);
        }
    }
    async function handleSearchUsers() {
        try {
            const data = await searchUsers(query, token);
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
                {
                    !authWindow &&
                    <div className="search-bar">
                        {!nav && <i className="fa-solid fa-search search-icon menu-item" onClick={toggleSearch}></i>}
                        {
                            search && 
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
                        }
                        <div className="search-result">
                            {searchResult && searchResult.map((user) => (
                                <div className="search-item" key={user.userID} onClick={()=>{
                                    const url = `/${user.userName}/profile`;
                                    window.open(url, '_blank');
                                }}>
                                    {user.userName && <img src={user.profilePhotoUrl} alt="profile" onError={(e)=>{e.target.src = "/src/assets/profile-photo-holder.jpg";}}/>}
                                    <p>{user.name}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                }
            </div>
            {
                !authWindow &&
                <>
                    <div className="nav">
                        <ul className="nav-menu">
                            <NavLink to="/home" className="menu-item" onClick>
                                <i className="fa-solid fa-house"></i>
                                <p>Home</p>
                            </NavLink>
                        </ul>
                        <div className="user-profile-item"  onClick={toggleShowProfileMenu}>
                            <img src={profilePhotoUrl} onError={()=>{setProfilePhotoUrl("/src/assets/profile-photo-holder.jpg");}}/>
                            <p>{user.name}</p>
                            {nav && <i className="fa-solid fa-chevron-down drop-down-icon"></i>}
                            {showProfileMenu ?
                                <ul className="profile-menu">
                                    <NavLink to={`/${user.userName}/profile`} className="profile-menu-item">
                                        <i className="fa-solid fa-user"></i>
                                        <p>Profile</p>
                                    </NavLink>
                                    <NavLink to="/settings" className="profile-menu-item">
                                        <i className="fa-solid fa-gear"></i>
                                        <p>Settings</p>
                                    </NavLink>
                                    <div className="profile-menu-item" onClick={handleLogOut}>
                                        <i className="fa-solid fa-sign-out"></i>
                                        <p>Log Out</p>
                                    </div> 
                                </ul> :null}
                        </div>
                    </div>
                </>
            }
        </header>
    );
}