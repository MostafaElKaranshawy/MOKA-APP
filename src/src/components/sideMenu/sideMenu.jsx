import React, {useState, useEffect, useRef} from "react";
import "./sideMenu.css";
import { getUserFriends, getFriendRequests, removeFriendRequest, acceptFriendRequest } from "../../services/profileRequests";
export default function SideMenu(){
    const [profilePhotoURL, setProfilePhotoURL] = useState('/src/assets/profile-photo-holder.jpg');
    const userToken = document.cookie.split("authToken=")[1];
    const innerWidth = window.innerWidth;
    let sideMenu = (innerWidth > 756? true: false);
    function profileVisit(){
        const url = `/${user.userName}/profile`;
        window.open(url, '_blank');
    }
    const user = JSON.parse(localStorage.getItem('user'));
    const [friends, setFriends] = useState([]);
    const [friendRequests, setFriendRequests] = useState([]);
    useEffect(() => {
        if (user && userToken) {
            handleUser();
            setProfilePhotoURL(user.profilePhotoUrl);
        }
    }, [userToken]);

    const ws = useRef(null);

    useEffect(() => {
        // Create the WebSocket connection once
        ws.current = new WebSocket("ws://localhost:4001");

        ws.current.onmessage = (event) => {
            if (userToken && user) {
                handleUser();
            }
            console.log(`Message from server: ${event.data}`);
        };

        ws.current.onopen = () => {
            console.log('Connected to WebSocket server');
        };

        ws.current.onclose = () => {
            console.log('Disconnected from WebSocket server');
        };

        // Clean up on component unmount
        return () => {
            if (ws.current) {
                ws.current.close();
            }
        };
    }, []);

    const handleUser = async () => {
        const userFriends = await getUserFriends(user.userName, userToken);
        setFriends(userFriends);
        const userFriendRequests = await getFriendRequests(userToken);
        setFriendRequests(userFriendRequests);
    }
    const handleAcceptFriendRequest = async (friendID) => {
        await acceptFriendRequest(friendID, userToken);
        await handleUser();
    }
    const handleRemoveFriendRequest = async (friendID) => {
        await removeFriendRequest(friendID, userToken);
        await handleUser();
    }
    const visitProfile = async (userName) => {
        window.location.href = `/${userName}/profile`;
    }
    function timeAgo(date) {
        // console.log(date);
        date = new Date(date)
        const now = new Date();
        const secondsPast = Math.floor((now - date) / 1000);
        // console.log(date + " " + now);
        if (secondsPast < 60) {
            return `${secondsPast} seconds ago`;
        }
        if (secondsPast < 3600) {
            const minutesPast = Math.floor(secondsPast / 60);
            return `${minutesPast} minutes ago`;
        }
        if (secondsPast < 86400) {
            const hoursPast = Math.floor(secondsPast / 3600);
            return `${hoursPast} hours ago`;
        }
        if (secondsPast < 604800) {
            const daysPast = Math.floor(secondsPast / 86400);
            return `${daysPast} days ago`;
        }
    }
    return (
        <>{    
            sideMenu && (
                <div className="side-menu">
                    <div className="profile">
                        <img 
                            src={profilePhotoURL} onClick={profileVisit}
                            onError={()=>{setProfilePhotoURL("/src/assets/profile-photo-holder.jpg");}} 
                        />
                        <h2 className="profile-name" onClick={profileVisit}>{user.name}</h2>
                        <p className="profile-username">{`@${user.userName}`}</p>
                        <p className="profile-bio">{user.bio? `"${user.bio}"`:''}</p>
                    </div>
                    <div className="sidebar-sections">
                        <div className="friends sidebar-section">
                            <p>{friends.length || 0}</p>
                            <p>Friends</p>
                        </div>
                        <div className="friendRequests sidebar-section">
                            <p>{friendRequests.length || 0}</p>
                            <p>Friend Requests</p>
                        </div>
                    </div>
                    <div className="nav-menu-profile-friend-requests">
                        {friendRequests.map((friendRequest, index) => (
                            console.log(friendRequest),
                            <div className="nav-menu-profile-friend-request" key={index}>
                                <div  onClick={()=>{visitProfile(friendRequest.userName)}}>
                                    <img src={friendRequest.profilePhotoUrl} alt="friend" onError={(e)=>{e.target.src = "/src/assets/profile-photo-holder.jpg";}}/>
                                </div>
                                <div className="nav-menu-profile-friend-request-body">
                                    <div className="nav-menu-profile-friend-request-info">
                                        <div className="nav-menu-profile-friend-request-name-time">
                                            <p className="nav-menu-profile-friend-request-name">{friendRequest.name}</p>
                                            <p className="nav-menu-profile-friend-request-time">{timeAgo(friendRequest.time)}</p>
                                        </div>
                                        <p className="nav-menu-profile-friend-request-username">@{friendRequest.userName}</p>
                                    </div>
                                    <div className="nav-menu-profile-friend-request-options">
                                        <div className="accept" onClick={() => handleAcceptFriendRequest(friendRequest.userID)}>
                                            Accept
                                        </div>
                                        <div className="reject" onClick={() => handleRemoveFriendRequest(friendRequest.userID)}>
                                            Reject
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )
        }
        </>
    )
}