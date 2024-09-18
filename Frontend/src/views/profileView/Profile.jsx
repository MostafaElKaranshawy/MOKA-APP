import React, { useEffect, useState, useRef} from "react";
import Post from "../../components/post/post";
import Loading from "../../components/loading/loading";
import "./profile.css";
import { useParams } from "react-router-dom";
import {
    getUserProfile,
    getUserFriends,
    updateUserInfo,
    getFriendRequests,
    sendFriendRequest,
    removeFriendRequest,
    acceptFriendRequest,
    getFriendStatus,
    removeFriend,
    getUserPosts
} from "../../services/profileRequests";
import { deletePost } from "../../services/postRequests";
import { 
    changeProfilePhoto
} from '../../services/userRequests';
import { getWebSocket } from "../../webSocket";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ConfirmationBox from "../../components/confirmation/confirmationBox";
import Header from "../../components/header/header";

export default function Profile() {
    const cookies = document.cookie;
    const { userName } = useParams();
    if(!document.cookie.split("authToken=")[1]){
        window.location.href = "/";
    }
    const userToken = cookies.split("authToken=")[1];
    const [showAllFriends, setShowAllFriends] = useState(false);
    const [showEditBio, setshowEditBio] = useState(false);
    const [user, setUser] = useState(
        {
            name : '',
            bio : '',
        }
    );
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [lastPage, setLastPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const limit = 5;
    const [error, setError] = useState(null);
    const [mainUserFriendRequests, setMainUserFriendRequests] = useState([]);
    const [profilePhotoURL, setProfilePhotoURL] = useState('profile-photo-holder.jpg');
    const mainUser = userName === JSON.parse(localStorage.getItem("user")).userName;
    const [friendStatus, setFriendStatus] = useState("");
    const [friends, setFriends] = useState([]);
    const [bio, setBio] = useState(' ');
    const profileBody = useRef(null);
    const toggleShowFriends = () => {
        setShowAllFriends(!showAllFriends);
    };
    const [showConfirmation, setShowConfirmation] = useState(false);

    useEffect(() => {
        if (error) toast.error(error, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            pauseOnHover: true,
        });
    }, [error]);

    const toggleshowEditBio = () => {
        setshowEditBio(!showEditBio);
    };

    useEffect(() => {
        if (userName && userToken) {
            fetchUserProfile();
        }
        
    }, [userToken, userName]);
    

    useEffect(() => {
        setBio(user.bio || '');
    }, [user]);

    // const ws = useRef(null);

    useEffect(() => {
        // Create the WebSocket connection once
        const ws = getWebSocket(user.userID);

        ws.onmessage = (event) => {
            if (userToken && userName) {
                fetchUserProfile();
            }
            console.log(`Message from server: ${event.data}`);
        };
        return () => {
        };
    }, [user]);
    useEffect(() => {
        if (page === 1) return; // Avoid fetching on initial render
        if(!loading)return;
        handlePaginations();
    }, [page]);
    useEffect(() => {
        const scrollTracker = profileBody.current;
        if (!scrollTracker) return; // Ensure scrollTracker is defined
    
        const handleScroll = () => { 
            if (scrollTracker.scrollTop + scrollTracker.clientHeight >= scrollTracker.scrollHeight - 250 && hasMore) {
                setPage(prevPage => prevPage + 1);
                setLoading(true);
            }
        };
    
        scrollTracker.addEventListener('scroll', handleScroll);
    
        return () => {
            scrollTracker.removeEventListener('scroll', handleScroll); // Cleanup listener on unmount
        };
    }, [hasMore, profileBody]);
    // Function to handle pagination and data fetching
    async function handlePaginations() {
        try {
            const postsData = await getUserPosts(user.userID, userToken, setError, page, limit);
            
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
    const editBio = (e) => {
        setBio(e.target.value || '');
    };

    async function saveBio() {
        try {
            setshowEditBio(false);
            const updatedUser = await updateUserInfo(user.name, bio, userToken, setError);
            setUser(updatedUser);
            localStorage.setItem("user", JSON.stringify(updatedUser));
        } catch (err) {
            setError(err.message);
        }
    }


    async function fetchUserProfile() {
        try {
            const userData = await getUserProfile(userName, userToken, setError);
            console.log(userData);
            setProfilePhotoURL(`${userData.profilePhotoUrl}`);
            console.log(profilePhotoURL);
            setUser(userData);
            if(mainUser){
                (localStorage.setItem("user", JSON.stringify(userData)));
            }
            
            const friendsData = await getUserFriends(userName, userToken, setError);
            setFriends(friendsData);
            let postsData;
            if(page == 1){
                postsData = await getUserPosts(userData.userID, userToken, setError, page, limit);
                setPosts(postsData);
            }
            else{
                postsData = await getUserPosts(userData.userID, userToken, setError, page, limit);
                setPosts(postsData);
            }
            console.log(postsData);
            setLoading(false);
            
            if (mainUser) {
                const friendRequestsData = await getFriendRequests(userToken, setError);
                setMainUserFriendRequests(friendRequestsData);
            }
            else{
                console.log(mainUser);
                const friendStatusData = await getFriendStatus(userData.userID, userToken, setError);
                setFriendStatus(friendStatusData);
            }
        } catch (err) {
            setError(err.message);
        }
    }

    const filteredFriends = showAllFriends ? friends : friends.slice(0, Math.floor(window.innerWidth / 350));

    async function handleAddFriend() {
        await sendFriendRequest(user.userID, userToken, setError);
        const friendStatusData = await getFriendStatus(user.userID, userToken, setError);
        setFriendStatus(friendStatusData);
        toast.success(`Friend Request Sent`);
    }

    async function handleRemoveFriendRequest(userID) {
        await removeFriendRequest(userID, userToken, setError);
        if(mainUser){
            const friendRequestsData = await getFriendRequests(userToken, setError);
            setMainUserFriendRequests(friendRequestsData);
        }
        else{
            const friendStatusData = await getFriendStatus(user.userID, userToken, setError);
            setFriendStatus(friendStatusData);
        }
    }

    async function handleAcceptFriendRequest(friendID) {
        await acceptFriendRequest(friendID, userToken, setError);
        if(mainUser){
            const friendRequestsData = await getFriendRequests(userToken, setError);
            setMainUserFriendRequests(friendRequestsData);
        }
        else{
            const friendStatusData = await getFriendStatus(user.userID, userToken, setError);
            setFriendStatus(friendStatusData);
        }
        const friendsData = await getUserFriends(userName, userToken, setError);
        setFriends(friendsData);
        
    }

    async function handleRemoveFriend() {
        setShowConfirmation(false);
        await removeFriend(user.userID, userToken, setError);
        const friendsData = await getUserFriends(userName, userToken, setError);
        setFriends(friendsData);
        const friendStatusData = await getFriendStatus(user.userID, userToken, setError);
            setFriendStatus(friendStatusData);
    }
    const goToUserProfile = (userName) => () => {
        console.log(userName);
        window.location.href = `/${userName}/profile`;
    };

    const handleGetPosts = async () => {
        const userPosts = await getUserPosts(user.userID, userToken, setError, page, limit);
        setPosts(userPosts);
        console.log(userPosts);
    }
    const [profilePhoto, setProfilePhoto] = useState(null);
    const [photoPreview, setPhotoPreview] = useState(null);
    const handleFileChange = (e) => {
        setProfilePhoto(e.target.files[0]);
        const id = URL.createObjectURL(e.target.files[0]); // Generate a unique ID using object URL
        const reader = new FileReader();
        reader.onloadend = () => {
            setPhotoPreview({ id, src: reader.result });
        };
        reader.readAsDataURL(e.target.files[0]);
    };
    
    const handleUpload = async () => {
        if (!profilePhoto) return;
        const formData = new FormData();
        formData.append('profilePhoto', profilePhoto);
        console.log(profilePhoto);
        try {
            const newUserData = await changeProfilePhoto(formData, userToken);
            setUser(newUserData)
            await fetchUserProfile();
            setProfilePhoto(null);
            setPhotoPreview(null);
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };
    const cancelUpload = async () => {
        setProfilePhoto(null);
        setPhotoPreview(null);
    }
    const cancelConfirmation = ()=>{
        setShowConfirmation(false);
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
        <div className="profile-view view ">
            <Header/>
            <div className="body" ref={profileBody}>
                {showConfirmation && <ConfirmationBox content={`Are you sure to remove ${user.name} from your friends?`} cancel={cancelConfirmation} confirm={handleRemoveFriend}/>}
                <div className="profile-section">
                    <div className="profile-header">
                        <div className="profile-photo">
                            <img
                                src={`${import.meta.env.VITE_PHOTO_URL}/${profilePhotoURL}`}
                                className="profile-photo-preview"
                                onError={()=>{setProfilePhotoURL("profile-photo-holder.jpg");}}
                            />
                            {photoPreview && (
                                <img 
                                    className="change-profile-photo-preview"
                                    src={`${photoPreview.src}`} 
                                    alt="preview"
                                    onError={(e)=>{e.target.src = "profile-photo-holder.jpg";}}
                                />
                            )}
                            {
                                mainUser && (
                                    <div className="change-profile-photo" onClick={()=>{
                                        document.querySelector(".change-profile-photo input").click();
                                    }}>
                                        <i className="fa-solid fa-image upload-icon"  />
                                        <input type="file" accept="image/*" onChange={handleFileChange} name="profilePhoto"/>
                                    </div>
                                )
                            }
                        </div>
                        {profilePhoto && (
                            <div className="change-profile-photo-options">
                                <div className="save" onClick={handleUpload}>Save</div>
                                <div className="cancel" onClick={cancelUpload}>Cancel</div>
                            </div>
                        )}
                        <p className="profile-name">
                            {user.name}
                        </p>
                        <div className="profile-bio">
                            <p className="text-container" dangerouslySetInnerHTML={{ __html: user.bio?user.bio.replace(/\n/g, '<br />'): '' }} />
                            {mainUser && <i className="fa fa-pencil bio-edit-icon" onClick={toggleshowEditBio}></i>}
                            {showEditBio &&
                                <div className="edit-bio-text">
                                    <textarea name="bio" className="bio-box" value={bio} onChange={editBio}></textarea>
                                    <div className="edit-bio-options">
                                        <div className="cancel edit-option" onClick={() => {
                                            setshowEditBio(false);
                                            setBio(user.bio || '');
                                        }}>Cancel</div>
                                        <div className="save edit-option" onClick={saveBio}>Save</div>
                                    </div>
                                </div>
                            }
                        </div>
                        <div className="profileOptions">
                            {!mainUser && (
                                <>
                                    {friendStatus == "Not Friends" && (
                                        <div className="add-friend" onClick={handleAddFriend}>
                                            Add Friend
                                        </div>
                                    )}

                                    {friendStatus == "Friends" && (
                                        <div className="friends-option" onClick={()=>{setShowConfirmation(true)}}>
                                            <p>Friends</p>
                                            <i className="fa fa-solid fa-user"></i>
                                        </div>
                                        /* <div className="remove-friend" onClick={handleRemoveFriend}>
                                            Remove Friend
                                        </div> */
                                    )}

                                    {friendStatus == "Friend Request Received" && (
                                        <>
                                            <div className="accept-request" onClick={()=>{handleAcceptFriendRequest(user.userID)}}>
                                                Accept Request
                                            </div>
                                            <div className="remove-request" onClick={()=>{handleRemoveFriendRequest(user.userID)}}>
                                                Remove Request
                                            </div>
                                        </>
                                    )}

                                    {friendStatus == "Friend Request Sent" && (
                                        <div className="cancel-request" onClick={()=>{handleRemoveFriendRequest(user.userID)}}>
                                            Cancel Request
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                    <div className="profile-friends">
                        <p className="profile-friends-title">Friends</p>
                        <div className="profile-friends-list">
                            {filteredFriends.map((friend, index) => (
                                <div className="profile-friend" key={index} onClick={goToUserProfile(friend.userName)}>
                                    <img src={`${import.meta.env.VITE_PHOTO_URL}/${friend.profilePhotoUrl}`} alt="friend" onError={(e)=>{e.target.src = "profile-photo-holder.jpg";}} />
                                    <p className="profile-friend-name">{friend.name}</p>
                                </div>
                            ))}
                        </div>
                        <p className="show-all-friends" onClick={toggleShowFriends}>
                            Show {showAllFriends ? "fewer" : "all"} friends
                        </p>
                    </div>
                    {
                        mainUser && 
                        <div className="profile-friend-requests">
                            <p className="profile-friend-requests-title">Friend Requests</p>
                            <div className="profile-friend-requests-list">
                                {mainUserFriendRequests.map((friendRequest, index) => (
                                    <div className="profile-friend-request" key={index}>
                                        <div className="friend-request-user-info" onClick={goToUserProfile(friendRequest.userName)}>
                                            <img src={`${import.meta.env.VITE_PHOTO_URL}/${friendRequest.profilePhotoUrl}`} alt="friend" onError={(e)=>{e.target.src = "profile-photo-holder.jpg";}} />
                                            <p className="profile-friend-request-name" onClick={()=>(goToUserProfile(friendRequest.userName))}>{friendRequest.name}</p>
                                        </div>
                                        <div className="profile-friend-request-options">
                                            <div className="accept" onClick={() => handleAcceptFriendRequest(friendRequest.userID)}>
                                                Accept
                                            </div>
                                            <div className="reject" onClick={() => handleRemoveFriendRequest(friendRequest.userID)}>
                                                Reject
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    }
                </div>
                <div className="posts">
                    <p className="profile-posts-header">Posts</p>
                    {
                        posts.length ? posts.map((post) => (
                            <Post 
                            key={post.postID} 
                            post={post} 
                            getPosts={handleGetPosts}
                            deletePost={handleDeletePost}
                            userToken={userToken}
                            />
                        )) : null
                    }
                </div>
                {/* <button className="more-button"onClick={() => {
                        setPage((prev) => prev + 1);
                        setLoading(true);
                }}>
                    Load More
                </button> */}
                <div className="loading">
                    {loading && <Loading/>}
                    {!hasMore && !loading && <p>No More Posts</p>}
                </div>
            </div>
        </div>
    );
}
