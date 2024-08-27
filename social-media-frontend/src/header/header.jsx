import React, {useState} from "react";
import { BrowserRouter as Router, Routes, Route, Link, NavLink } from 'react-router-dom';


import "./header.css";
import Notifications from "../notifications/notifications";
export default function Header() {
    let nav = (window.innerWidth > 500? true: false)
    const [navMenu, setNavMenu] = useState(nav);
    function toggleNav() {
        setNavMenu((prev) => !prev);
    }

    return (
        <header className="header">
            <div className="logo-search-container">
                <i className="fa-brands fa-facebook"></i>
                <input type="search" placeholder="Find friends" />
            </div>
            <div className="nav-icon" onClick={toggleNav}>
                <i className="fa-solid fa-bars"/>
            </div>
            {
                navMenu && (
                <ul className="nav-menu">
                    {/* <li className="menu-item"> */}
                        <NavLink to="/home" className="menu-item">
                            <i className="fa-solid fa-house"></i>
                            <p>Home</p>
                        </NavLink>
                    {/* </li> */}
                    {/* <li className="menu-item"> */}
                        <NavLink to="/profile" className="menu-item">
                            <i className="fa-solid fa-user"></i>
                            <p>Profile</p>
                        </NavLink>
                    {/* </li> */}
                    <li className="menu-item">
                        <i className="fa-solid fa-bell"></i>
                        <p>Updates</p>
                        {/* <Notifications /> */}
                    </li>
                </ul>)
            }
        </header>
    );
}