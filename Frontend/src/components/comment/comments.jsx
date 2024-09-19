import React, { useState, useRef, useEffect, useContext } from "react";
import "./comment.css";
import Comment from "./comment";
import { DarkMode } from "../../darkModeContext";
import {
    deleteComment,
    editComment,
    likeComment,
    unlikeComment
} from '../../services/commentRequests'
export default function Comments(probs) {
    const comments = probs.comments;
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [currentFilter, setCurrentFilter] = useState("Most Recent");
    const [filteredCommments, setFilteredComments] = useState([]);
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
    const [profilePhotoURL, setProfilePhotoURL] = useState('profile-photo-holder.jpg');
    const {darkMode} = useContext(DarkMode);
    const toggleDropdown = () => {
        setIsDropdownOpen(prev => !prev);
    };
    useEffect(() => {
        if (user) {
            setProfilePhotoURL(user.profilePhotoUrl);
        }
    }, [user])
    useEffect(() => {
        Filtering();
    }, [comments, currentFilter]); // Added `comments` as a dependency

    function Filtering() {
        if(!comments){
            setFilteredComments([]);
        }
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
    async function handleDeleteComment(commentID){
        await deleteComment(commentID, probs.postID, probs.userToken);
        await probs.getComments();
    }
    async function handleEditComment(commentID, newContent) {
        await editComment(commentID, newContent, probs.postID, probs.userToken);
        await probs.getComments();
    }
    async function handleLikeComment(commentID) {
        await likeComment(commentID, probs.postID, probs.userToken);
        await probs.getComments();
    }
    async function handleUnlikeComment(commentID) {
        await unlikeComment(commentID, probs.postID, probs.userToken);
        await probs.getComments();
    }
    return (
        <div className={`comment-list ${darkMode && "dark-mode"}`}>
            <div className="compose-comment">
                <img src={`${import.meta.env.VITE_PHOTO_URL}/${profilePhotoURL}`} alt="profile" className="comment-profile-picture" onError={()=>{setProfilePhotoURL("profile-photo-holder.jpg");}} />
                <div className="compose-body">
                    <textarea
                        ref={textareaRef}
                        value={commentContent}
                        onChange={handleChange}
                        placeholder="Write a comment..."
                        className="compose-comment-content"
                        onInput={(e)=>{
                            if(e.target.value == ''){
                                e.target.style.height = '30px'
                                return
                            }
                            e.target.style.height = 'auto';
                            e.target.style.height = `${e.target.scrollHeight}px`;
                        }}
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
                    <Comment key={comment.commentID} comment={comment} likeComment={handleLikeComment} unlikeComment={handleUnlikeComment} editComment={handleEditComment} deleteComment={handleDeleteComment} />
                ))
            ) : (
                <p className="no-comments">No Comments</p>
            )}
        </div>
    );
}
