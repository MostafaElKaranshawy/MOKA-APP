import React, {useState, useEffect, useRef} from "react";
import "./post.css";
import CommentList from "../comment/comments";
import {
    editPost,
    likePost,
    unlikePost,
    getPostLikes
} from "../../services/postRequests";
import {
    getComments,
    createComment
} from '../../services/commentRequests'
export default function Post(probs){
    const user = JSON.parse(localStorage.getItem("user"));
    const post = probs.post;
    const [liked, setLike] = useState(post.liked);
    const [showComments, setShowComments] = useState(false);
    const [showOptions, setShowOptions] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [showPostLikes, setShowPostLikes] = useState(false)
    const [newContent, setNewContent] = useState(post.content);
    const [comments, setComments] = useState([]);
    const [profilePhotoURL, setProfilePhotoURL] = useState('/src/assets/profile-photo-holder.jpg');
    const [postLikes, setPostLikes] = useState([])
    const [postPhotos, setPostPhotos] = useState(post.photos);
    const [editPhotos, setEditPhotos] = useState(post.photos);
    const [curPhoto, setCurPhoto] = useState(0);
    useEffect(() => {
        if(probs.userToken && post){
            setProfilePhotoURL(post.profilePhotoUrl);
            handleGetComments();
        }
    }, []);
    useEffect(()=>{
        if(probs.userToken && showComments){
            handleGetComments();
        }
    }, [showComments])
    const ws = useRef(null);

    useEffect(() => {
        // Create the WebSocket connection once
        ws.current = new WebSocket("ws://localhost:4001");

        ws.current.onmessage = (event) => {
            if (probs.userToken && user) {
                handleGetComments();
            }
            console.log(`Message from server: ${event.data}`);
        };

        ws.current.onopen = () => {
            console.log('Connected to WebSocket server');
        };

        ws.current.onclose = () => {
            console.log('Disconnected from WebSocket server');
        };

        // Clean up on component unmount
        return () => {
            if (ws.current) {
                ws.current.close();
            }
        };
    }, []);
    async function handleGetComments(){
        const commentsData = await getComments(post.postID, probs.userToken);
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
            await probs.deletePost(post.postID);
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
            alert("Post cannot be empty");
            setEditPhotos(post.photos);
            setCurPhoto(0);
            return;
        }
        const removedPhotos = postPhotos.filter((photo) => !editPhotos.includes(photo)).map((photo) => photo.id);
        try{
            await editPost(post.postID, newContent, removedPhotos ,probs.userToken);
            await probs.getPosts();
        }
        catch(err){
            console.log(err);
        }
    }
    async function handleLikePost(){
        await likePost(post.postID, probs.userToken);
        await probs.getPosts();
    }
    async function handleUnlikePost(){
        await unlikePost(post.postID, probs.userToken);
        await probs.getPosts();
    }
    async function handleAddComment(content){
        await createComment(content, post.postID, probs.userToken);
        await handleGetComments();
    }
    async function handleGetPostLikes(){
        if(showPostLikes){
            setShowPostLikes(false);
            return;
        }
        setShowPostLikes(true);
        const likeUsers = await getPostLikes(post.postID, probs.userToken);
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
        <div className="post">
            <div className="post-details">
                <img src={profilePhotoURL} className="post-profile-photo" onClick={goToUserProfile(post.userName)} onError={()=>{setProfilePhotoURL("/src/assets/profile-photo-holder.jpg");}}/>
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
                                    <img src={`/Backend/${editPhotos[curPhoto].url}`} />
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
                                        <img src={like.user.profilePhotoUrl}/>
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
                        postID={post.postID}
                        userToken={probs.userToken}
                    />
                </div> : null
            }
        </div>
    )
}