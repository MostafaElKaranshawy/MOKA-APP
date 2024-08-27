import React from "react";
import "./comment.css";
import profilePhoto from "../assets/profile-photo-holder.jpg";
export default function Comment({ comment }) {
    const [liked, setLike] = React.useState(comment.liked);
    function toggleLike() {
        setLike((pre) => !pre);
    }
    return (
        <div className="comment">
            <div className="comment-header">
                <img src={profilePhoto} alt="profile" className="comment-profile-picture"/>
                <div className="comment-user">
                    <span className="comment-username">{comment.authorName}</span>
                    <span className="comment-time">{comment.time}</span>
                </div>
            </div>
            <div className="comment-body">
                <p>{comment.content}</p>
            </div>
            <div className="comment-options">
                <div className="comment-like" onClick={toggleLike}>
                    {liked ?
                        <i className="fa-regular fa-heart" ></i> : <i className="fa-solid fa-heart" style={{ color: "red" }}></i>
                    }
                </div>
                <div className="comment-likes">
                    {comment.likes}
                </div>
            </div>
        </div>
    );
}