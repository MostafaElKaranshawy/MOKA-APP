import React, { useState, useEffect } from "react";
import axios from 'axios';
import Post from "../post/post";
import NewPost from "../newPost/newPost";
import "./mainSection.css";

export default function MainSection() {
    const [user, setUser] = useState(null);
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
            getPosts();
        }
    }, [userToken]);

    async function getPosts() {
        try {
            const response = await axios.get("http://localhost:4000/posts/feed?page=1&limit=10", {
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${userToken}`
                },
            });
            const postsData = response.data;
            console.log(postsData);
            setPosts(postsData);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }

    async function addPost(content) {
        try {
            const newPost = {
                "content": content
            };
            const response = await axios.post("http://localhost:4000/post", newPost, {
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${userToken}`
                },
            });
            // console.log(response.data);
            getPosts(); // Reload posts after adding a new one
        } catch (error) {
            console.log(error);
        }
    }
    async function deletePost(postID) {
        try {
            const response = await axios.delete(`http://localhost:4000/posts/${postID}`, {
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${userToken}`
                },
            });
            console.log(response.data);
            getPosts();
        } catch (error) {
            console.log(error);
        }
        
    }
    
    async function editPost(postID, newContent) {
        try {
            const body = {
                "content": newContent
            };
            const response = await axios.patch(`http://localhost:4000/posts/${postID}`,body, {
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${userToken}`
                },
            });
            console.log(response.data);
            getPosts();
        } catch (error) {
            console.log(error);
        }
        
    }
    async function likePost(postID) {
        try {
            const response = await axios.post(`http://localhost:4000/posts/${postID}/like`, {}, {
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${userToken}`
                },
            });
            console.log(response.data);
            getPosts();
        } catch (error) {
            console.log(error);
        }
    }
    async function unlikePost(postID) {
        try {
            const response = await axios.delete(`http://localhost:4000/posts/${postID}/like`, {
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${userToken}`
                },
            });
            console.log(response.data);
            getPosts();
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className="main-section">
            <NewPost createPost={addPost} />
            <div className="posts">
                {loading ? <p>Loading...</p> : (
                    posts.length ? posts.map((post) => (
                        <Post 
                        key={post.postID} 
                        post={post} 
                        deletePost={deletePost}
                        editPost={editPost}
                        likePost={likePost}
                        unlikePost={unlikePost}
                        userToken={userToken}
                        />
                    )) : <p>No Posts To Show</p>
                )}
            </div>
        </div>
    );
}
