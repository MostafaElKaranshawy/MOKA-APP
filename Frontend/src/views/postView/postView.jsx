import React, {useState, useEffect, useRef} from "react";
import "./post.css";
import CommentList from "../../components/comment/comments"
import {
    getPost,
    editPost,
    likePost,
    unlikePost,
    getPostLikes,
    deletePost,
} from "../../services/postRequests";
import {
    getComments,
    createComment
} from '../../services/commentRequests'
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function PostView(){
    const user = JSON.parse(localStorage.getItem("user"));
    if(!document.cookie.split("authToken=")[1]){
        window.location.href = "/";
    }
    const cookies = document.cookie;
    const userToken = cookies.split("authToken=")[1];
    const {postID} = useParams()
    const [post, setPost] = useState(null);
    const [liked, setLike] = useState(false);
    const [showComments, setShowComments] = useState(false);
    const [showOptions, setShowOptions] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [showPostLikes, setShowPostLikes] = useState(false)
    const [newContent, setNewContent] = useState('');
    const [comments, setComments] = useState([]);
    const [profilePhotoURL, setProfilePhotoURL] = useState('profile-photo-holder.jpg');
    const [postLikes, setPostLikes] = useState([])
    const [postPhotos, setPostPhotos] = useState([]);
    const [editPhotos, setEditPhotos] = useState([]);
    const [curPhoto, setCurPhoto] = useState(0);
    useEffect(() => {
        if(userToken){
            handleFetchPost();
        }
    }, []);
    useEffect(()=>{
        if(userToken && showComments && postID){
            handleGetComments();
        }
    }, [showComments])
    async function handleFetchPost() {
        const postData = await getPost(postID, userToken);
        console.log(postData.liked)
        if(!postData)return
        setPost(postData);
        setProfilePhotoURL(postData.profilePhotoUrl);
        await handleGetComments();
        setLike(postData.liked);
        setNewContent(postData.content);
        setEditPhotos(postData.photos);
        setPostPhotos(postData.photos);
    }
    async function handleGetComments(){
        console.log(postID)
        const commentsData = await getComments(postID, userToken);
        setComments(commentsData);
        setShowPostLikes(false);
    }
    async function toggleShowComments(){
        setShowComments((pre)=>!pre);
        setShowPostLikes(false);
    }
    function toggleShowOptions(){
        setShowOptions((pre)=>!pre);
        setShowPostLikes(false);
    }
    function toggleShowEdit(){
        setShowOptions(false);
        setShowPostLikes(false);
        setNewContent(post.content);
        setShowEdit((pre)=>!pre);
    }
    const handleCancelEdit = () => {
        setShowOptions(false);
        setShowPostLikes(false);
        setNewContent(post.content);
        setShowEdit((pre)=>!pre);
        setEditPhotos(post.photos);
        setCurPhoto(0);
    }
    async function changeLike(){
        setShowPostLikes(false);
        setLike((pre)=>!pre)
        if(liked){
            await handleUnlikePost();
        }
        else{
            await handleLikePost();
        }
    }
    async function handleDeletePost(){
        try{
            await deletePost(postID, userToken);
            window.location.href = "/home";
            toggleShowOptions();
        }
        catch(err){
            console.log(err);
        }
    }
    async function handleEditPost(){
        toggleShowEdit();
        toggleShowOptions();
        if(newContent.trim() === "" && editPhotos.length === 0){
            toast.error("Post can't be empty", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                pauseOnHover: true,
            });
            setEditPhotos(post.photos);
            setCurPhoto(0);
            return;
        }
        const removedPhotos = postPhotos.filter((photo) => !editPhotos.includes(photo)).map((photo) => photo.id);
        try{
            await editPost(postID, newContent, removedPhotos ,userToken);
            await handleFetchPost();
        }
        catch(err){
            console.log(err);
        }
    }
    async function handleLikePost(){
        await likePost(postID, userToken);
        setLike(true);
        await handleFetchPost();
    }
    async function handleUnlikePost(){
        await unlikePost(postID, userToken);
        setLike(false);
        await handleFetchPost();
    }
    async function handleAddComment(content){
        await createComment(content, postID, userToken);
        await handleGetComments();
    }
    async function handleGetPostLikes(){
        if(showPostLikes){
            setShowPostLikes(false);
            return;
        }
        setShowPostLikes(true);
        const likeUsers = await getPostLikes(postID, userToken);
        setPostLikes(likeUsers)
        console.log(showPostLikes)
        console.log(likeUsers);
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
    const goToUserProfile = (userName) => () => {
        console.log(userName);
        const url = `/${userName}/profile`;
        window.open(url, '_blank');
    };
    const increaseCurPhoto = () => {
        console.log(curPhoto);
        if(editPhotos.length > 0){
            setCurPhoto((curPhoto+1)%editPhotos.length);
        }
    }
    const decreaseCurPhoto = () => {
        console.log(curPhoto);
        if(editPhotos.length > 0){
            setCurPhoto((curPhoto-1+editPhotos.length)%editPhotos.length);
        }
    }
    const handleRemovePhoto = () => {
        console.log("remove photo");
        const newPhotos = editPhotos.filter((photo, index) => index !== curPhoto);
        setEditPhotos(newPhotos);
        // setPostPhotos(newPhotos);
        if(curPhoto >= newPhotos.length){
            setCurPhoto(curPhoto-1);
        }
    }
    return (
        <div className="post-view">
            
            {post? 
                <div className="post">
                <div className="post-details">
                    <img src={`${import.meta.env.VITE_PHOTO_URL}/${profilePhotoURL}`} className="post-profile-photo" onClick={goToUserProfile(post.userName)} onError={()=>{setProfilePhotoURL("profile-photo-holder.jpg");}}/>
                    <div className="post-body">
                        <div className="post-header">
                            <div className="post-header-info">
                                <div className="name-time">
                                    <div className="post-user-info">
                                        <p onClick={goToUserProfile(post.userName)} className="post-author-name">{post.authorName}</p>
                                        <p className="post-user-name">{`@${post.userName}`}</p>
                                    </div>
                                    <p className="post-time">{timeAgo(post.time)}</p>
                                </div>
                            </div>
                            {post.userID === user.userID &&
                                <i className="fa-solid fa-ellipsis-h post-options-icon" onClick={toggleShowOptions}/>
                            }
                            {showOptions &&
                                <ul className="post-options">
                                    <li className="post-option" onClick={toggleShowEdit}>Edit Post</li>
                                    <li className="post-option" onClick={handleDeletePost}>Delete Post</li>
                                </ul>
                            }
                        </div>
                        <div className="post-content text-container" >
                            <p className="text-container" dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br />') }} />
                            {editPhotos.length > 0 && (
                                <div className="post-photos">
                                    {editPhotos.length > 1 && <i className="fa fa-chevron-left left-arrow nav-arrow" onClick={decreaseCurPhoto}></i>}
                                    <div className="post-photo">
                                        {showEdit && <i className="fa-solid fa-circle-xmark remove-photo" onClick={handleRemovePhoto}></i>}
                                        <img src={`${import.meta.env.VITE_PHOTO_URL}/${editPhotos[curPhoto].url}`} />
                                    </div>
                                    {editPhotos.length > 1 && <i className="fa fa-chevron-right right-arrow nav-arrow" onClick={increaseCurPhoto}></i>}
                                    {editPhotos.length > 1 && <p className="photo-count">{`${curPhoto+1}/${editPhotos.length}`}</p>}
                                </div>
                            )}
                            {showEdit && 
                                <div className="edit-post">
                                    <textarea defaultValue={post.content} onChange={
                                        (e)=>{
                                            setNewContent(e.target.value);
                                        }
                                    }></textarea>
                                    <div className="edit-post-options">
                                        <button onClick={handleCancelEdit}>Cancel</button>
                                        <button onClick={handleEditPost}>Save</button>
                                    </div>
                                </div>
                            }
                        </div>
                        <div className="post-action-details">
                            {
                                postLikes.length>0 && showPostLikes &&(
                                <div className="post-like-users">
                                    {postLikes.map((like) => (
                                        <div className="post-like-user" key={like.user.userID} onClick={goToUserProfile(like.user.userName)}>
                                            <img src={`${import.meta.env.VITE_PHOTO_URL}/${like.user.profilePhotoUrl}`}/>
                                            <p>{like.user.name}</p>
                                        </div>
                                    ))} 
                                </div>)
                            }
                            <div className="post-action-detail" onClick={handleGetPostLikes}>
                                {post.likes > 0 && <>
                                        <i className="fa-solid fa-heart" style={{color:"red"}}></i>
                                        <p>{post.likes}</p>
                                    </>
                                }
                            </div>
                            <div className="post-action-detail" onClick={toggleShowComments}>
                                {comments && comments.length > 0 && <>
                                    <p>{comments.length}</p>
                                    <p>Comments</p>
                                </>
                                }
                            </div>
                        </div>
                        <div className="post-actions">
                                {liked? (
                                    <div className="post-action" onClick={changeLike}>
                                        <i className="fa-solid fa-heart" style={{color:"red"}}></i>
                                        <p>UnLike</p>
                                        {/* {post.likes >0?<p className="action-count">{post.likes}</p>:null}  */}
                                    </div>
                                    )
                                :
                                <div className="post-action" onClick={changeLike}>
                                        <i className="fa-regular fa-heart like-icon"></i>
                                        <p>Like</p>
                                        {/* {post.likes >0?<p className="action-count">{post.likes}</p>:null} */}
                                    </div>
                                }
                                
                            <div className="post-action" onClick={toggleShowComments}>
                                <i className="fa-regular fa-comment"></i>
                                <p>Comment</p>
                                {/* {comments.length > 0? <p className="action-count">{comments.length}</p> : null} */}
                            </div>
                        </div>
                    </div>
                </div>
                {
                    showComments? 
                    <div className="post-comments">
                        <CommentList
                            comments={comments || []} 
                            createComment={handleAddComment}
                            getComments={handleGetComments}
                            postID={postID}
                            userToken={userToken}
                        />
                    </div> : null
                }
                </div>
                :<p>Post Not Found</p>
            }
        </div>
    )
}