import React, { useState, useEffect, useRef } from "react";
import Loading from "../loading/loading";
import Post from "../post/post";
import NewPost from "../newPost/newPost";
import "./mainSection.css";
import { getPosts, deletePost } from "../../services/postRequests";
// import ws from "../webSocket";
export default function MainSection() {
    // const ws = new WebSocket("ws://localhost:4001");
    const [user, setUser] = useState({});
    const [userToken, setUserToken] = useState(null);
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [lastPage, setLastPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const limit = 5;

    useEffect(() => {
        const cookies = document.cookie;
        const token = cookies.split("authToken=")[1];
        setUser(JSON.parse(localStorage.getItem('user')));
        setUserToken(token);
    }, []);
    useEffect(() => {
        if (userToken) {
            console.log(userToken);
            setTimeout(() => {
                handleGetPosts();
            }, 1200)
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
    useEffect(() => {
        if (page === 1) return; // Avoid fetching on initial render
        if(!loading)return;
        handlePaginations();
    }, [page]);

    // Function to handle pagination and data fetching
    async function handlePaginations() {
        try {
            const postsData = await getPosts(userToken, page, limit);
            
            // Simulate network delay
            setTimeout(() => {
                console.log(page)
                console.log(postsData.length)
                if (postsData.length == 0) {
                    setHasMore(false);
                    setLoading(false);
                    // Don't increment the page if no posts are returned
                    return;
                }
                // Update state with fetched posts
                setPosts((prev) => [...prev, ...postsData]);
                setLastPage(page);
                setLoading(false);
            }, 1500); // Adjust the delay as needed
        } catch (error) {
            console.error('Error fetching posts:', error);
            setLoading(false); // Ensure loading is set to false on error
        }
    }

    async function handleGetPosts() {
        try {
            let postsData;
            if(page == 1){
                postsData = await getPosts(userToken, page, limit);
                setPosts(postsData);
            }
            else{
                postsData = await getPosts(userToken, 1, limit*page); 
                setPosts(postsData);
            }
            console.log(postsData);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }
    async function handleDeletePost(postID){
        try{ 
            await deletePost(postID, userToken);
            await handleGetPosts();
        }
        catch(err){
            console.log(err);
        }
    }
    return (
        <div className="main-section">
            <NewPost getPosts={handleGetPosts} userToken={userToken}/>
            <div className="posts">
                {(
                    posts.length ? posts.map((post, index) => (
                        <Post
                            key={post.postID} 
                            post={post} 
                            getPosts={handleGetPosts}
                            deletePost={handleDeletePost}
                            userToken={userToken}
                        />
                    )) : null
                )}
                <button className="more-button"onClick={() => {
                    setPage((prev) => prev + 1);
                    setLoading(true);
                }}>
                    Load More
                </button>
                <div className="loading">
                    {loading && <Loading/>}
                    {!hasMore && !loading && <p>No More Posts</p>}
                </div>
            </div>
        </div>
    );
}
