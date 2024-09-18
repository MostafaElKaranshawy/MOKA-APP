import React, {useEffect, useState, useRef} from "react";
import { BrowserRouter as Router, Routes, Route, Link, NavLink } from 'react-router-dom';
import "./header.css";
import { signOut } from "../../services/authRequests";
import {searchUsers, getNotifications, seeNotification} from '../../services/userRequests'
import { getWebSocket } from "../../webSocket";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ConfirmationBox from "../confirmation/confirmationBox";

export default function Header() {
    const token = document.cookie.split("authToken=")[1];
    let nav = (window.innerWidth > 700? true: false)
    const [search, setsearch] = useState(true);
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const authWindow = (window.location.href == "http://localhost:5173/" ? true : false);
    const [notifications, setNotifications] = useState([]); 
    const [showNotifications, setShowNotifications] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    useEffect(() => {
        if(authWindow)return
        const ws = getWebSocket(JSON.parse(localStorage.getItem("user")).userID);
        ws.onmessage = (event) => {
            console.log('Message from server:', event.data);
            toast(event.data, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            handleNotifications();
        }
    }, [])
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
    useEffect(() => {
        handleSearch();
    },[searchQuery])
    function toggleSearch() {
        if(search) {
            document.querySelector(".search-icon").classList.remove("active-search");
        }
        else{
            document.querySelector(".search-icon").classList.add("active-search");
        }
        setsearch((prev) => !prev);
        if(!search) setShowProfileMenu(false);
    }
    let [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
    const [profilePhotoUrl, setProfilePhotoUrl] = useState("profile-photo-holder.jpg");
    const [searchResult, setSearchResult] = useState([])
    const handleStorageChange = () => {
        setUser(JSON.parse(localStorage.getItem("user")));
    }
    useEffect(() => {
        if (!authWindow && user.profilePhotoUrl) {
            setProfilePhotoUrl(user.profilePhotoUrl);
            handleNotifications();
        }
        window.addEventListener('storage', handleStorageChange);
    }, [user])
    const handleNotifications = async () => {
        try {
            let data = await getNotifications(token);
            data.sort((a, b) => new Date(b.time) - new Date(a.time));
            let notificationsData = data.map((notification) => {
                notification.time = timeAgo(notification.time);
                return notification;
            });
            setNotifications(notificationsData);
            console.log(data);
        } catch (error) {
            console.error(error);
        }
    }
    const toggleShowNotifications = async () => {
        setShowNotifications((prev) => !prev);
        if(showNotifications) {
            document.querySelector(".notificationIcon").classList.remove("active");
        }
        else{
            document.querySelector(".notificationIcon").classList.add("active");
            handleNotifications();
        }
    }
    const handleSearch = async () => {
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
        if(searchQuery.trim() === "") {
            setSearchResult([]);
            return;
        }
        try {
            const data = await searchUsers(searchQuery, token);
            if(data.length == 0) {
                setSearchResult([{name : "No Results", userID: 0}]);
                return;
            }
            setSearchResult(data);
        } catch (error) {
            console.error(error);
        }
    }
    const handleNotificationClick = async (notification) => {
        if(!notification)return;
        console.log(token)
        if(notification.type === "friendRequest") {
            const url = `/${notification.from.userName}/profile`;
            window.open(url, '_self');
            await handleFriendRequesNotification(notification.notificationID);
        }
        else {
            const url = `/post/${notification.postID}`;
            window.open(url, '_self');
            await handleSeeNotification(notification.notificationID);
        }
    }
    const handleFriendRequesNotification = async(notificationID)=> {
        try {
            await seeNotification(notificationID, token);
            await handleNotifications();
        } catch (error) {
            console.error(error)
        }
    }
    const handleSeeNotification = async(notificationID)=> {
        try {
            await seeNotification(notificationID, token);
            await handleNotifications();
            
        } catch (error) {
            console.error(error)
        }
    }
    const handleCancelConfirmation = ()=>{
        setShowConfirmation(false);
    }
    function timeAgo(date) {
        date = new Date(date)
        const now = new Date();
        const secondsPast = Math.floor((now - date) / 1000);
        if (secondsPast < 60) {
            return `${secondsPast} s`;
        }
        if (secondsPast < 3600) {
            const minutesPast = Math.floor(secondsPast / 60);
            return `${minutesPast} m`;
        }
        if (secondsPast < 86400) {
            const hoursPast = Math.floor(secondsPast / 3600);
            return `${hoursPast} h`;
        }
        if (secondsPast < 604800) {
            const daysPast = Math.floor(secondsPast / 86400);
            return `${daysPast} d`;
        }
    }       
    return (
        <header className="header">
            {showConfirmation && <ConfirmationBox content={`Are You Sure To Log Out?`} cancel={handleCancelConfirmation} confirm={handleLogOut} />}
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
                            value={searchQuery}
                            onInput={(e) => {
                                setSearchQuery(e.target.value);
                            }}
                            placeholder="Find friends"
                            />
                        }
                        {
                            searchQuery && <i className="fa-solid fa-times clear-search-icon" onClick={()=>{
                                setSearchQuery("");
                                setSearchResult([]);
                            }}></i>
                        }
                        <div className="search-result">
                            {searchResult && searchResult.map((user) => (
                                <div className="search-item" key={user.userID} onClick={()=>{
                                    if(user.userID === 0)return;
                                    const url = `/${user.userName}/profile`;
                                    window.open(url, '_blank');
                                }}>
                                    {user.userName && <img src={`${import.meta.env.VITE_PHOTO_URL}/${user.profilePhotoUrl}`} alt="profile" onError={(e)=>{e.target.src = "profile-photo-holder.jpg";}}/>}
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
                            <div className="menu-item notificationIcon" onClick={toggleShowNotifications}>
                                <i className="fa-solid fa-bell"></i>
                                {
                                    notifications.filter((notification) => notification.seen === false).length > 0 &&
                                    <span className="notification-count">
                                        {notifications.filter((notification) => notification.seen === false).length}
                                    </span>
                                }
                            </div>
                        </ul>
                        {showNotifications && (<div className="notifications">
                            {notifications.length > 0 && notifications.map((notification) => (
                                <div className={notification.seen?`notification`: `notification not-seen`} key={notification.notificationID} onClick={()=>{handleNotificationClick(notification)}}>
                                    <img src={`${import.meta.env.VITE_PHOTO_URL}/${notification.from.profilePhotoUrl}`} onError={(e)=>{e.target.src = "profile-photo-holder.jpg";}}/>
                                    <div className="notification-data">
                                        <p className="notification-content">
                                            <span className="notification-user-name">{notification.from.name}</span> {notification.content}
                                        </p>
                                        <p className="notification-time">
                                            {notification.time}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>)}
                        {showNotifications && notifications.length == 0 && <div className="no-notifications">
                                <p>No Notifications</p>
                                </div>}
                        <div className="user-profile-item"  onClick={toggleShowProfileMenu}>
                            <img src={`${import.meta.env.VITE_PHOTO_URL}/${profilePhotoUrl}`} onError={()=>{setProfilePhotoUrl("profile-photo-holder.jpg");}}/>
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
                                    <div className="profile-menu-item" onClick={()=>setShowConfirmation(true)}>
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