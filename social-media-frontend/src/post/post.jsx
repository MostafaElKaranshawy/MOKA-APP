import React, {useState, useEffect} from "react";
import "./post.css";
import profilePhoto from "../assets/profile-photo-holder.jpg";
import CommentList from "../comment/comments";
import axios from "axios";
import {
    addPost,
    deletePost,
    editPost,
    likePost,
    unlikePost
} from "./postRequests";
export default function Post(probs){
    const user = JSON.parse(localStorage.getItem("user"));
    const post = probs.post;
    const [liked, setLike] = useState(post.liked);
    const [showComments, setShowComments] = useState(false);
    const [showOptions, setShowOptions] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [newContent, setNewContent] = useState(post.content);
    const [comments, setComments] = useState([]);

    useEffect(() => {
        if(probs.userToken){
            getComments();
        }
    }, []);
    useEffect(()=>{
        if(probs.userToken && showComments){
            getComments();
        }
    }, [showComments])
    async function toggleShowComments(){
        setShowComments((pre)=>!pre);
    }
    function toggleShowOptions(){
        setShowOptions((pre)=>!pre);
    }
    function toggleShowEdit(){
        setShowOptions(false);
        setNewContent(post.content);
        setShowEdit((pre)=>!pre);
    }
    function changeLike(){
        setLike((pre)=>!pre)
        if(liked){
            handleUnlikePost();
        }
        else{
            handleLikePost();
        }
    }
    async function handleDeletePost(){
        await deletePost(post.postID, probs.userToken);
        await probs.getPosts();
        toggleShowOptions();
    }
    async function handleEditPost(){
        toggleShowEdit();
        toggleShowOptions();
        if(newContent.trim() === ""){
            alert("Post cannot be empty");
            return;
        }
        await editPost(post.postID, newContent, probs.userToken);
        await probs.getPosts();
    }
    async function handleLikePost(){
        await likePost(post.postID, probs.userToken);
        await probs.getPosts();
    }
    async function handleUnlikePost(){
        unlikePost(post.postID, probs.userToken);
        await probs.getPosts();
    }
    async function getComments(){
        try {
            const response = await axios.get(`http://localhost:4000/posts/${post.postID}/comments?page=1&limit=10`, {
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${probs.userToken}`
                },
            });
            const commentsData = response.data;
            setComments(commentsData);
        } catch (error) {
            console.log(error);
        }
    }
    async function createComment(content){
        try {
            const newComment = {
                "content": content
            };
            const response = await axios.post(`http://localhost:4000/posts/${post.postID}/comment`, newComment, {
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${probs.userToken}`
                },
            });
            await getComments();
        } catch (error) {
            console.log(error);
        }
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
    return (
        <div className="post">
            {post.shared &&
            <div className="shared-post">
                    <img src={profilePhoto}/>
                    <span> shared this</span>
            </div>}
            <div className="post-header">
                <div className="post-header-info">
                    <img src={profilePhoto} alt="" />
                    <div className="name-time">
                        <p>{post.authorName}</p>
                        <p>{timeAgo(post.time)}</p>
                    </div>
                </div>
                {post.userID === user.userID &&
                    <i className="fa-solid fa-ellipsis-v post-options-icon" onClick={toggleShowOptions}/>
                }
                {showOptions &&
                    <ul className="post-options">
                        <li className="post-option" onClick={toggleShowEdit}>Edit Post</li>
                        <li className="post-option" onClick={handleDeletePost}>Delete Post</li>
                    </ul>
                }
            </div>
            <div className="post-content text-container">
                <p className="text-container" dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br />') }} />
                {showEdit && 
                    <div className="edit-post">
                        <textarea defaultValue={post.content} onChange={
                            (e)=>{
                                setNewContent(e.target.value);
                            }
                        }></textarea>
                        <div className="edit-post-options">
                            <button onClick={toggleShowEdit}>Cancel</button>
                            <button onClick={handleEditPost}>Save</button>
                        </div>
                    </div>
                }
            </div>
            <div className="post-actions">
                    {liked? (
                        <div className="post-action" onClick={changeLike}>
                            <i className="fa-solid fa-heart" style={{color:"red"}}></i>
                            <p>UnLike</p>
                            {post.likes >0?<p className="action-count">{post.likes}</p>:null} 
                        </div>
                        )
                    :
                        <div className="post-action" onClick={changeLike}>
                            <i className="fa-regular fa-heart like-icon"></i>
                            <p>Like</p>
                            {post.likes >0?<p className="action-count">{post.likes}</p>:null}
                        </div>
                    }
                    
                <div className="post-action" onClick={toggleShowComments}>
                    <i className="fa-regular fa-comment"></i>
                    <p>Comment</p>
                    {comments.length > 0? <p className="action-count">{comments.length}</p> : null}
                </div>
                {/* <div className="post-action">
                    <i className="fa-duotone fa-solid fa-retweet"></i>
                    <p>Share</p>
                </div> */}
            </div>
            {
                showComments? 
                <div className="post-comments">
                    <CommentList
                        comments={comments} 
                        createComment={createComment}
                        getComments={getComments}
                        postID={post.postID}
                        userToken={probs.userToken}
                    />
                </div> : null
            }
            
        </div>
    )
}