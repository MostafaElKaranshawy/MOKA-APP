import React, {useState, useEffect, useRef} from "react";
import "./sideMenu.css";
import profilePhoto from "../assets/profile-photo-holder.jpg";
import { getUserFriends, getFriendRequests, removeFriendRequest, acceptFriendRequest } from "../routes/profileRequests";
export default function SideMenu(){
    // const ws = new WebSocket("ws://localhost:4001");
    
    const userToken = document.cookie.split("authToken=")[1];
    const innerWidth = window.innerWidth;
    let sideMenu = (innerWidth > 756? true: false);
    function profileVisit(){
        window.location.href = "/profile";
    }
    const user = JSON.parse(localStorage.getItem('user'));
    const [friends, setFriends] = useState([]);
    const [friendRequests, setFriendRequests] = useState([]);
    useEffect(() => {
        if (user && userToken) {
            handleUser();
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
    return (
        <>{    
            sideMenu && (
                <div className="side-menu">
                    <div className="profile">
                        <img src={profilePhoto} onClick={profileVisit}/>
                        <h2 className="profile-name" onClick={profileVisit}>{user.name}</h2>
                    </div>
                    <div className="friends sidebar-section">
                        <p>Friends</p>
                        <p>{friends.length || 0}</p>
                    </div>
                    <div className="friendRequests sidebar-section">
                        <p>Friend Requests</p>
                        <p>{friendRequests.length || 0}</p>
                    </div>
                    <div className="profile-friend-requests">
                        <div className="profile-friend-requests-list">
                            {friendRequests.map((friendRequest, index) => (
                                <div className="profile-friend-request" key={index}>
                                    <div className="friend-request-user-info" onClick={()=>{visitProfile(friendRequest.userName)}}>
                                        <img src="https://www.w3schools.com/howto/img_avatar.png" alt="friend" />
                                        <p className="profile-friend-request-name">{friendRequest.name}</p>
                                    </div>
                                    <div className="profile-friend-request-options">
                                        <div className="accept" onClick={() => handleAcceptFriendRequest(friendRequest.userID)}>
                                            Accept
                                        </div>
                                        <div className="reject" onClick={() => handleRemoveFriendRequest(friendRequest.userID)}>
                                            Reject
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )
        }
        </>
    )
}