import React, {useEffect, useState} from "react";
import Header from "../header/header";
import "./profile.css";

export default function Profile(){
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
        setUser(JSON.parse(localStorage.getItem("user")));
        console.log(JSON.parse(localStorage.getItem("user")))
        setUser((user) => 
            {
                return {
                    ...user,
                    bio: "Hello to Mustafa ELkaranshawy Profile"
                }
            }
        )
        
    }, [])
    const [bio, setBio] = useState(user.bio);
    useEffect(() => {
        setBio(user.bio);
    }, [user])
    console.log(bio)
    const editBio = (e) => {
        setBio(e.target.value);
    }
    const saveBio = () => {
        setUser((user) => {
            return {
                ...user,
                bio: bio
            }
        });
        setshowEditBio(false);
    }
    const friends = [
        {
            friendID: 1,
            name: "John Doe"
        },
        {
            friendID: 2,
            name: "Jane Doe"
        },
        {
            friendID: 3,
            name: "John Doe"
        },
        {
            friendID: 4,
            name: "Jane Doe"
        },
        {
            friendID: 5,
            name: "John Doe"
        },
        {
            friendID: 6,
            name: "Jane Doe"
        },
        {
            friendID: 7,
            name: "John Doe"
        },
        {
            friendID: 8,
            name: "Jane Doe"
        },
        {
            friendID: 9,
            name: "John Doe"
        },
        {
            friendID: 10,
            name: "Jane Doe"
        },
        {
            friendID: 11,
            name: "John Doe"
        },
        {
            friendID: 12,
            name: "Jane Doe"
        }
    ];
    const filteredFriends = showAllFriends? friends:friends.filter((friend, index) => index < (window.innerWidth / 350));
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
                                        setBio(user.bio);
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