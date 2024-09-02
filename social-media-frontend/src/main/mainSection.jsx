import React, { useState, useEffect } from "react";
import axios from 'axios';
import Post from "../post/post";
import NewPost from "../newPost/newPost";
import "./mainSection.css";
import { getPosts } from "../post/postRequests";
export default function MainSection() {
    const [user, setUser] = useState({});
    const [userToken, setUserToken] = useState(null);
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const cookies = document.cookie;
        const token = cookies.split("authToken=")[1];
        setUserToken(token);
        setUser(JSON.parse(localStorage.getItem('user')));
    }, []);
    
    useEffect(() => {
        if (userToken) {
            console.log(userToken);
            handleGetPosts();
        }
    }, [userToken]);

    async function handleGetPosts() {
        try {
            const postsData = await getPosts(userToken);
            console.log(postsData);
            setPosts(postsData);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }
    return (
        <div className="main-section">
            <NewPost getPosts={handleGetPosts} userToken={userToken}/>
            <div className="posts">
                {loading ? <p>Loading...</p> : (
                    posts.length ? posts.map((post) => (
                        <Post 
                        key={post.postID} 
                        post={post} 
                        getPosts={handleGetPosts}
                        userToken={userToken}
                        />
                    )) : <p>No Posts To Show</p>
                )}
            </div>
        </div>
    );
}
