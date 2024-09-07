import React from "react";

import "./notifications.css";
import profilePhoto from "../assets/profile-photo-holder.jpg";
export default function Notifications() {
    return (
        <div className="notifications">
            <div className="notification">
                <img src={profilePhoto} />
                <div className="notification-content">
                    <p className="content">John Doe liked your post</p>
                    <p className="time">2 minutes ago</p>
                </div>
            </div>
        </div>
    )
}