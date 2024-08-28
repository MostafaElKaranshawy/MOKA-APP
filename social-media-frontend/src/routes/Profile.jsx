import React from "react";
import Header from "../header/header";
import "./profile.css";

export default function Profile(){
    console.log(window.innerWidth);
    const [showAllFriends, setShowAllFriends] = React.useState(false);
    const toggleShowFriends = () => {
        setShowAllFriends(!showAllFriends);
    }
    const user = {
        name: "John Doe",
        bio: "I am Mustfa Elkaranshawy I am a full stack developer I am Mustfa Elkaranshawy I am a full stack developer I am"
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
                    <p className="profile-bio">
                        {user.bio}
                    </p>
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