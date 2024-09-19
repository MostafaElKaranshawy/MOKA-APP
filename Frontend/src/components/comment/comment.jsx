import React, {useState, useContext} from "react";
import "./comment.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { DarkMode } from "../../darkModeContext";

export default function Comment(probs){
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
    const comment = probs.comment;
    const [liked, setLike] = React.useState(comment.liked);
    const [showOptions, setShowOptions] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [newContent, setNewContent] = useState(comment.content);
    const [profilePhotoURL, setProfilePhotoURL] = useState(comment.profilePhotoURL);
    const {darkMode} = useContext(DarkMode);
    function toggleLike() {
        setLike((pre) => !pre);
    }
    function toggleShowOptions(){
        setShowOptions((pre)=>!pre);
    }
    function toggleShowEdit(){
        setShowOptions(false);
        setNewContent(comment.content);
        setShowEdit((pre)=>!pre);
    }
    function likeComment(){
        toggleLike();
        probs.likeComment(comment.commentID);
    }
    function unlikeComment(){
        toggleLike();
        probs.unlikeComment(comment.commentID);
    }
    function deleteComment(){
        probs.deleteComment(comment.commentID);
    }
    function editComment(){
        if(newContent.trim() === ""){
            toast.error("Comment can't be empty", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                pauseOnHover: true,
            });
            return;
        }
        console.log(newContent)
        probs.editComment(comment.commentID, newContent);
        toggleShowEdit();
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
    const goToUserProfile = () => {
        const url = `/${comment.userName}/profile`;
        window.open(url, '_blank');
    };
    return (
        <div className={`comment ${darkMode && 'dark-mode'}`}>
            <div className="comment-header">
                <img src={`${import.meta.env.VITE_PHOTO_URL}/${profilePhotoURL}`} alt="profile" className="comment-profile-picture" onClick={goToUserProfile} onError={()=>{setProfilePhotoURL("profile-photo-holder.jpg");}}/>
            </div>
            <div className="comment-body">
                <div className="comment-user">
                    <div className="comment-user-info">
                        <span className="comment-user-name" onClick={goToUserProfile}>{comment.authorName}</span>
                        <span className="comment-user-username">{`@${comment.userName}`}</span>
                    </div>
                    <span className="comment-time">{timeAgo(comment.time)}</span>
                </div>
                <div className="comment-content text-container">
                    <p className="comment-content-text text-container" dangerouslySetInnerHTML={{ __html: comment.content.replace(/\n/g, '<br />') }} />
                    {showEdit && 
                    <div className="edit-comment">
                        <textarea defaultValue={comment.content} onChange={
                            (e)=>{
                                setNewContent(e.target.value);
                            }
                        }></textarea>
                        <div className="edit-comment-options">
                            <button onClick={toggleShowEdit}>Cancel</button>
                            <button onClick={editComment}>Save</button>
                        </div>
                    </div>
                }    
                </div>
            </div>
            <div className="comment-options">
                {comment.userID === user.userID &&
                    <i className="fa-solid fa-ellipsis-h comment-options-icon" onClick={toggleShowOptions}/>
                }
                {showOptions &&
                    <ul className="comment-options-list">
                        <li className="comment-option" onClick={toggleShowEdit}>Edit Comment</li>
                        <li className="comment-option" onClick={deleteComment}>Delete Comment</li>
                    </ul>
                }
                <div className="comment-like" >
                    {!liked ?
                        <i className="fa-regular fa-heart like-icon" onClick={likeComment}></i> : <i className="fa-solid fa-heart" style={{ color: "red" }} onClick={unlikeComment}></i>
                    }
                </div>
                <div className="comment-likes">
                    {comment.likes}
                </div>

            </div>
        </div>
    );
}