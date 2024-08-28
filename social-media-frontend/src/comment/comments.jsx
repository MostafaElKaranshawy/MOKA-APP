import React, { useState, useRef, useEffect } from "react";
import "./comment.css";
import Comment from "./comment";
import profilePhoto from "../assets/profile-photo-holder.jpg";
import axios from "axios";

export default function Comments(probs) {
    const comments = probs.comments;
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [currentFilter, setCurrentFilter] = useState("Most Recent");
    const [filteredCommments, setFilteredComments] = useState([]);

    const toggleDropdown = () => {
        setIsDropdownOpen(prev => !prev);
    };

    useEffect(() => {
        Filtering();
    }, [comments, currentFilter]); // Added `comments` as a dependency

    function Filtering() {
        let filtered = [...comments]; // Use a copy of comments to avoid mutating the original
        if (currentFilter === 'All Comments') {
            filtered.sort((comment1, comment2) => new Date(comment1.time) - new Date(comment2.time));
        } else if (currentFilter === "Most Recent") {
            filtered.sort((comment1, comment2) => new Date(comment2.time) - new Date(comment1.time));
            filtered = filtered.slice(0, 5); // Use slice to avoid mutation
        } else if (currentFilter === "Top Comments") {
            filtered.sort((comment1, comment2) => comment2.likes - comment1.likes);
            filtered = filtered.slice(0, 5); // Use slice to avoid mutation
        }
        setFilteredComments(filtered);
    }

    const handleSelectItem = (item) => {
        setCurrentFilter(item);
        setIsDropdownOpen(false);
    };

    const [commentContent, setCommentContent] = useState("");
    const textareaRef = useRef(null);

    const handleChange = (event) => {
        setCommentContent(event.target.value);
    };

    async function addComment() {
        if (commentContent.trim() === "") {
            return;
        }
        await probs.createComment(commentContent);
        setCommentContent("");
    }

    async function deleteComment(commentID) {
        try {
            console.log(commentID);
            const response = await axios.delete(`http://localhost:4000/posts/${probs.postID}/comments/${commentID}`, {
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${probs.userToken}`
                },
            });
            await probs.getComments();
        } catch (error) {
            console.log(error);
        }
    }

    async function editComment(commentID, newContent) {
        try {
            const body = {
                "content": newContent
            };
            console.log(commentID);
            const response = await axios.patch(`http://localhost:4000/posts/${probs.postID}/comments/${commentID}`, body, {
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${probs.userToken}`
                },
            });
            await probs.getComments();
        } catch (error) {
            console.log(error);
        }
    }

    async function likeComment(commentID) {
        try {
            console.log("commentID: ", commentID);
            const response = await axios.post(`http://localhost:4000/posts/${probs.postID}/comments/${commentID}/like`, {}, {
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${probs.userToken}`
                },
            });
            await probs.getComments();
        } catch (error) {
            console.log(error);
        }
    }

    async function unlikeComment(commentID) {
        try {
            console.log("commentID: ", commentID);
            const response = await axios.delete(`http://localhost:4000/posts/${probs.postID}/comments/${commentID}/like`, {
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${probs.userToken}`
                },
            });
            await probs.getComments();
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="comment-list">
            <div className="compose-comment">
                <img src={profilePhoto} alt="profile" className="comment-profile-picture" />
                <div className="compose-body">
                    <textarea
                        ref={textareaRef}
                        value={commentContent}
                        onChange={handleChange}
                        placeholder="Write a comment..."
                        className="compose-comment-content"
                    />
                    <button onClick={addComment}>Post</button>
                </div>
            </div>
            {comments.length ? (
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
            ) : null}
            {filteredCommments.length ? (
                filteredCommments.map((comment) => (
                    <Comment key={comment.commentID} comment={comment} likeComment={likeComment} unlikeComment={unlikeComment} editComment={editComment} deleteComment={deleteComment} />
                ))
            ) : (
                <p>No Comments</p>
            )}
        </div>
    );
}
