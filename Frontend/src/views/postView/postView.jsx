import React, {useState, useEffect, useContext} from "react";
import "./post.css";
import CommentList from "../../components/comment/comments"
import {
    getPost,
    deletePost,
} from "../../services/postRequests";
import { useParams } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import Header from "../../components/header/header";
import { DarkMode } from "../../darkModeContext";
import Post from "../../components/post/post";

export default function PostView(){
    if(!document.cookie.split("authToken=")[1]){
        window.location.href = "/";
    }
    const cookies = document.cookie;
    const userToken = cookies.split("authToken=")[1];
    const {postID} = useParams()
    const [post, setPost] = useState(null);
    const {darkMode} = useContext(DarkMode);
    useEffect(() => {
        if(userToken){
            handleFetchPost();
        }
    }, []);
    async function handleFetchPost() {
        const postData = await getPost(postID, userToken);
        if(!postData)return
        setPost(postData);
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
    return (
        <div className="post-view view">
            <Header />
            <div className={`body ${darkMode && 'dark-mode'}`}>
                {post?
                <Post
                    post={post}
                    userToken={userToken}
                    deletePost={handleDeletePost}
                    getPosts={handleFetchPost}
                />
                    :<p>Post Not Found</p>
                }
            </div>
        </div>
    )
}