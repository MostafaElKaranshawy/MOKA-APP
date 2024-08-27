import React, {useState} from "react";
import "./sideMenu.css";
import profilePhoto from "../assets/profile-photo-holder.jpg";
export default function SideMenu(){
    const innerWidth = window.innerWidth;
    let sideMenu = (innerWidth > 756? true: false);
    function profileVisit(){
        window.location.href = "/profile";
    }
    return (
        <>{    
            sideMenu && (
                <div className="side-menu">
                    <div className="profile">
                        <img src={profilePhoto} onClick={profileVisit}/>
                        <h2 className="profile-name" onClick={profileVisit}>John Doe</h2>
                    </div>
                    <div className="friends sidebar-section">
                        <p>Friends</p>
                        <p>200</p>
                    </div>
                    <div className="friendRequests sidebar-section">
                        <p>Friend Requests</p>
                        <p>10</p>
                    </div>
                </div>
            )
        }
        </>
    )
}