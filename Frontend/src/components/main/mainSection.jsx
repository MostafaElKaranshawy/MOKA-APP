import React, { useState, useEffect, useRef, useContext } from "react";
import Loading from "../loading/loading";
import Post from "../post/post";
import NewPost from "../newPost/newPost";
import "./mainSection.css";
import { getPosts, deletePost } from "../../services/postRequests";
import { DarkMode } from "../../darkModeContext";
export default function MainSection(probs) {
    const [user, setUser] = useState({});
    const [userToken, setUserToken] = useState(null);
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [lastPage, setLastPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const {darkMode} = useContext(DarkMode);
    const limit = 5;
    const timeOutRef = useRef(null);
    useEffect(() => {
        const scrollTracker = probs.mainRef.current;
        if (!scrollTracker) return; // Ensure scrollTracker is defined
    
        const handleScroll = () => {
            if(timeOutRef.current)clearTimeout(timeOutRef.current);
            timeOutRef.current = setTimeout(() => {
                if (scrollTracker.scrollTop + scrollTracker.clientHeight >= scrollTracker.scrollHeight - 250 && hasMore) {
                    setPage(prevPage => prevPage + 1);
                    setLoading(true);
                }
            }, 100);
        };
    
        scrollTracker.addEventListener('scroll', handleScroll);
    
        return () => {
            scrollTracker.removeEventListener('scroll', handleScroll); // Cleanup listener on unmount
        };
    }, [hasMore, probs.mainRef]);
    
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
            setHasMore(true);
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
        <div className={`main-section ${darkMode && 'dark-mode'}`}>
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
                <div className="loading">
                    {loading && <Loading/>}
                    {!hasMore && !loading && <p className="no-more-posts">No More Posts</p>}
                </div>
            </div>
        </div>
    );
}
