import React, { useState,useRef, useEffect } from "react";
import "./comment.css";
import Comment from "./comment";
import profilePhoto from "../assets/profile-photo-holder.jpg";

export default function Comments({ comments }) {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [currentFilter, setCurrentFilter] = useState("Most Recent");

    const toggleDropdown = () => {
        console.log("toggleDropdown");
        setIsDropdownOpen(prev => !prev);
    };

    const handleSelectItem = (item) => {
        setCurrentFilter(item);
        setIsDropdownOpen(false);
    };
    const [comment, setComment] = useState("");
    const textareaRef = useRef(null);

    useEffect(() => {
        const textarea = textareaRef.current;
        textarea.style.height = 'auto';
        textarea.style.height = `${textarea.scrollHeight}px`; // Set height based on scroll height
    }, [comment]);

    const handleChange = (event) => {
        setComment(event.target.value);
    };
    const addComment = () => {
        if (comment.trim() === "") {
            return;
        }
        console.log(comment);
        comments.unshift({
            content: comment,
            authorName: "User",
            time:  new Date().toLocaleString(),
            likes: 0,
            liked: false,
        });
        setComment("");
    }
    return (
        <div className="comment-list">
            <div className="compose-comment">
                <img src={profilePhoto} alt="profile" className="comment-profile-picture"/>
                <div className="compose-body">
                <textarea
                    ref={textareaRef}
                    value={comment}
                    onChange={handleChange}
                    placeholder="Write a comment..."
                    className="compose-comment-content"
                />
                    <button onClick={addComment}>Post</button>
                </div>
            </div>
            <div className="comment-filter">
                <div className="select-selected" onClick={toggleDropdown}>
                    {currentFilter}
                    {!isDropdownOpen && <i className="fa-solid fa-chevron-down"></i>}
                    {isDropdownOpen && <i className="fa-solid fa-chevron-up"></i>}
                </div>
                {isDropdownOpen && (
                    <div className="select-items">
                        <div className="select-item" onClick={() => handleSelectItem("All Comments")}>
                            All Comments
                        </div>
                        <div className="select-item" onClick={() => handleSelectItem("Top Comments")}>
                            Top Comments
                        </div>
                        <div className="select-item" onClick={() => handleSelectItem("Most Recent")}>
                            Most Recent
                        </div>
                    </div>
                )}
            </div>
            {comments.map((comment, index) => (
                <Comment key={index} comment={comment} filter={currentFilter} />
            ))}
        </div>
    );
}
