import React, {useEffect, useState} from "react";
import Header from "../header/header";
import axios from 'axios'
import "./profile.css";

export default function Profile(){
    const cookies = document.cookie;
    const userToken = cookies.split("authToken=")[1];
    const [showAllFriends, setShowAllFriends] = useState(false);
    const [showEditBio, setshowEditBio] = useState(false);
    const [user, setUser] = useState({});
    const toggleShowFriends = () => {
        setShowAllFriends(!showAllFriends);
    }
    const toggleshowEditBio = () => {
        setshowEditBio(!showEditBio);
    }
    useEffect(() => {
        if (userToken) {
            getUserProfile();
        }
    }, [userToken]);
    const [bio, setBio] = useState(user.bio || ' ');
    useEffect(() => {
        setBio(user.bio || '');
    }, [user])
    const editBio = (e) => {
        setBio(e.target.value || '');
    }
    async function saveBio(){
        setshowEditBio(false);
        await editUserInfo();
        console.log("Bio saved")
    }
    const [friends, setFriends] = useState([]);

    async function getFriends(){
        try {
            const response = await axios.get("http://localhost:4000/friends/", {
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${userToken}`
                },
            });
            const friendsData = await response.data;
            setFriends(friendsData);
        } catch (error) {
            console.log(error);
        }
    }
    async function getUserProfile(){
        try {
            // console.log("Getting user profile")
            const response = await axios.get("http://localhost:4000/user/profile", {
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${userToken}`
                },
            });
            const newUserData = response.data;
            setUser(newUserData)
            await getFriends()
        } catch (error) {
            console.log(error);
        }
    }
    const filteredFriends = showAllFriends? friends:friends.filter((friend, index) => index < (window.innerWidth / 350));
    async function editUserInfo(){
        try {
            console.log("Edit user info")
            const newInfo = {
                name : user.name,
                bio : bio
            }
            const response = await axios.patch("http://localhost:4000/user/profile",newInfo, {
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${userToken}`
                },
            });
            console.log(response)
            const newUserInfo = response.data;
            setUser(newUserInfo);
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className="profile view">
            <Header/> 
            <div className="profile-section">
                <div className="profile-header">
                    <div className="profile-photo">
                        <img src="https://www.w3schools.com/howto/img_avatar.png" alt="profile"/>
                    </div>
                    <p className="profile-name">
                        {user.name}
                    </p>
                    <div className="profile-bio">
                        <p className="bio">
                            {user.bio}
                        </p>
                        <i className="fa fa-pencil bio-edit-icon" onClick={toggleshowEditBio}></i>
                        {showEditBio &&
                            <div className="edit-bio-text">
                                <textarea name="bio" className="bio-box" value={bio} onChange={editBio}>
                                </textarea>
                                <div className="edit-bio-options">
                                    <div className="cancel edit-option" onClick={()=> {
                                        setshowEditBio(false);
                                        setBio(user.bio || '');
                                    }}>Cancel</div>
                                    <div className="save edit-option" onClick={saveBio}>Save</div>
                                </div>
                            </div>
                        }
                    </div>
                </div>
                <div className="profile-friends">
                    <p className="profile-friends-title">
                        Friends
                    </p>
                    <div className="profile-friends-list">
                        {
                            filteredFriends.map((friend, index) => {
                                return (
                                    <div className="profile-friend" key={index}>
                                        <img src="https://www.w3schools.com/howto/img_avatar.png" alt="friend"/>
                                        <p className="profile-friend-name">{friend.name}</p>
                                    </div>
                                );
                            })
                        }
                    </div>
                    <p className="show-all-friends" onClick={toggleShowFriends}>
                        Show {showAllFriends? "fewer": "all"} friends
                    </p>
                </div>
            </div>
        </div>
    );
}