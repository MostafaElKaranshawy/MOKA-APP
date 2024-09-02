import React, { useState, useEffect, useRef } from "react";
import axios from 'axios';
import Post from "../post/post";
import NewPost from "../newPost/newPost";
import "./mainSection.css";
import { getPosts } from "../post/postRequests";
// import ws from "../webSocket";
export default function MainSection() {
    // const ws = new WebSocket("ws://localhost:4001");
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
    const ws = useRef(null);

    useEffect(() => {
        // Create the WebSocket connection once
        ws.current = new WebSocket("ws://localhost:4001");

        ws.current.onmessage = (event) => {
            if (userToken) {
                // console.log('Getting posts');
                handleGetPosts();
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
