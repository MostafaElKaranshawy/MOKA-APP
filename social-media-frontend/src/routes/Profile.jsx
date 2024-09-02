import React, { useEffect, useState } from "react";
import Header from "../header/header";
import Post from "../post/post";
import "./profile.css";
import { useParams } from "react-router-dom";
import {
    getUserProfile,
    getUserFriends,
    updateUserInfo,
    getFriendRequests,
    sendFriendRequest,
    removeFriendRequest,
    acceptFriendRequest,
    getFriendStatus,
    removeFriend,
    getUserPosts
} from "./profileRequests.jsx";

export default function Profile() {
    const cookies = document.cookie;
    const { userName } = useParams();
    const userToken = cookies.split("authToken=")[1];
    const [showAllFriends, setShowAllFriends] = useState(false);
    const [showEditBio, setshowEditBio] = useState(false);
    const [user, setUser] = useState(
        {
            name : '',
            bio : '',
        }
    );
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState(null);
    const [mainUserFriendRequests, setMainUserFriendRequests] = useState([]);
    // const [aFriend, setAFriend] = useState(false); 
    const mainUser = userName === JSON.parse(localStorage.getItem("user")).userName;
    const [friendStatus, setFriendStatus] = useState("");
    const toggleShowFriends = () => {
        setShowAllFriends(!showAllFriends);
    };

    useEffect(() => {
        if (error) alert(error);
    }, [error]);

    const toggleshowEditBio = () => {
        setshowEditBio(!showEditBio);
    };

    useEffect(() => {
        if (userName && userToken) {
            fetchUserProfile();
        }
    }, [userToken, userName]);

    const [bio, setBio] = useState(' ');

    useEffect(() => {
        setBio(user.bio || '');
    }, [user]);

    const editBio = (e) => {
        setBio(e.target.value || '');
    };

    async function saveBio() {
        try {
            setshowEditBio(false);
            const updatedUser = await updateUserInfo(user.name, bio, userToken, setError);
            setUser(updatedUser);
        } catch (err) {
            setError(err.message);
        }
    }

    const [friends, setFriends] = useState([]);

    async function fetchUserProfile() {
        try {
            const userData = await getUserProfile(userName, userToken, setError);
            setUser(userData);
            if(mainUser)(localStorage.setItem("user", JSON.stringify(userData)));
            
            const friendsData = await getUserFriends(userName, userToken, setError);
            setFriends(friendsData);
            const userPosts = await getUserPosts(userData.userID, userToken, setError);
            setPosts(userPosts);
            // setAFriend(friendsData.find(friend => friend.userName === JSON.parse(localStorage.getItem("user")).userName));
            
            if (mainUser) {
                const friendRequestsData = await getFriendRequests(userToken, setError);
                setMainUserFriendRequests(friendRequestsData);
            }
            else{
                const friendStatusData = await getFriendStatus(userData.userID, userToken, setError);
                setFriendStatus(friendStatusData);
            }
        } catch (err) {
            setError(err.message);
        }
    }

    const filteredFriends = showAllFriends ? friends : friends.slice(0, Math.floor(window.innerWidth / 350));

    async function handleAddFriend() {
        await sendFriendRequest(user.userID, userToken, setError);
        const friendStatusData = await getFriendStatus(user.userID, userToken, setError);
        setFriendStatus(friendStatusData);
    }

    async function handleRemoveFriendRequest(userID) {
        await removeFriendRequest(userID, userToken, setError);
        if(mainUser){
            const friendRequestsData = await getFriendRequests(userToken, setError);
            setMainUserFriendRequests(friendRequestsData);
        }
        else{
            const friendStatusData = await getFriendStatus(user.userID, userToken, setError);
            setFriendStatus(friendStatusData);
        }
    }

    async function handleAcceptFriendRequest(friendID) {
        await acceptFriendRequest(friendID, userToken, setError);
        if(mainUser){
            const friendRequestsData = await getFriendRequests(userToken, setError);
            setMainUserFriendRequests(friendRequestsData);
        }
        else{
            const friendStatusData = await getFriendStatus(user.userID, userToken, setError);
            setFriendStatus(friendStatusData);
        }
        const friendsData = await getUserFriends(userName, userToken, setError);
        setFriends(friendsData);
        
    }

    async function handleRemoveFriend() {
        await removeFriend(user.userID, userToken, setError);
        const friendsData = await getUserFriends(userName, userToken, setError);
        setFriends(friendsData);
        const friendStatusData = await getFriendStatus(user.userID, userToken, setError);
            setFriendStatus(friendStatusData);
    }
    const goToUserProfile = (userName) => () => {
        window.location.href = `/${userName}/profile`;
    };

    const handleGetPosts = async () => {
        const userPosts = await getUserPosts(user.userID, userToken, setError);
        setPosts(userPosts);
    }
    return (
        <div className="profile-view view ">
            <Header />
            <div className="profile-section">
                <div className="profile-header">
                    <div className="profile-photo">
                        <img src="https://www.w3schools.com/howto/img_avatar.png" alt="profile" />
                    </div>
                    <p className="profile-name">
                        {user.name}
                    </p>
                    <div className="profile-bio">
                        <p className="text-container" dangerouslySetInnerHTML={{ __html: user.bio?user.bio.replace(/\n/g, '<br />'): '' }} />
                        {mainUser && <i className="fa fa-pencil bio-edit-icon" onClick={toggleshowEditBio}></i>}
                        {showEditBio &&
                            <div className="edit-bio-text">
                                <textarea name="bio" className="bio-box" value={bio} onChange={editBio}></textarea>
                                <div className="edit-bio-options">
                                    <div className="cancel edit-option" onClick={() => {
                                        setshowEditBio(false);
                                        setBio(user.bio || '');
                                    }}>Cancel</div>
                                    <div className="save edit-option" onClick={saveBio}>Save</div>
                                </div>
                            </div>
                        }
                    </div>
                    <div className="profileOptions">
                        {!mainUser && (
                            <>
                                {friendStatus == "Not Friends" && (
                                    <div className="add-friend" onClick={handleAddFriend}>
                                        Add Friend
                                    </div>
                                )}

                                {friendStatus == "Friends" && (
                                    <div className="remove-friend" onClick={handleRemoveFriend}>
                                        Remove Friend
                                    </div>
                                )}

                                {friendStatus == "Friend Request Received" && (
                                    <>
                                        <div className="accept-request" onClick={()=>{handleAcceptFriendRequest(user.userID)}}>
                                            Accept Request
                                        </div>
                                        <div className="remove-request" onClick={()=>{handleRemoveFriendRequest(user.userID)}}>
                                            Remove Request
                                        </div>
                                    </>
                                )}

                                {friendStatus == "Friend Request Sent" && (
                                    <div className="cancel-request" onClick={()=>{handleRemoveFriendRequest(user.userID)}}>
                                        Cancel Request
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>
                <div className="profile-friends">
                    <p className="profile-friends-title">Friends</p>
                    <div className="profile-friends-list">
                        {filteredFriends.map((friend, index) => (
                            <div className="profile-friend" key={index} onClick={goToUserProfile(friend.userName)}>
                                <img src="https://www.w3schools.com/howto/img_avatar.png" alt="friend" />
                                <p className="profile-friend-name">{friend.name}</p>
                            </div>
                        ))}
                    </div>
                    <p className="show-all-friends" onClick={toggleShowFriends}>
                        Show {showAllFriends ? "fewer" : "all"} friends
                    </p>
                </div>
                {
                    mainUser && 
                    <div className="profile-friend-requests">
                        <p className="profile-friend-requests-title">Friend Requests</p>
                        <div className="profile-friend-requests-list">
                            {mainUserFriendRequests.map((friendRequest, index) => (
                                <div className="profile-friend-request" key={index}>
                                    <img src="https://www.w3schools.com/howto/img_avatar.png" alt="friend" />
                                    <p className="profile-friend-request-name">{friendRequest.name}</p>
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
                }
            </div>
            <div className="posts">
                <p>Posts</p>
                {
                    posts.length ? posts.map((post) => (
                        <Post 
                        key={post.postID} 
                        post={post} 
                        getPosts={handleGetPosts}
                        userToken={userToken}
                        />
                    )) : <p>No Posts To Show</p>
                }
            </div>
        </div>
    );
}
