import axios from 'axios'
const backendURL = import.meta.env.VITE_BACKEND_URL;
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
async function getUserProfile(userName, userToken, setError){
    try {
        const response = await axios.get(`${backendURL}/${userName}/profile`, {
            headers: {
                "Content-Type": "application/json",
                "authorization": `Bearer ${userToken}`
            },
        });
        const newUserData = response.data;
        return newUserData;
    } catch (err) {
        // setError(err.message);
        console.error(err);
    }
}
async function getUserFriends(userName, userToken, setError) {
    try {
        const response = await axios.get(`${backendURL}/${userName}/friends`, {
            headers: {
                "Content-Type": "application/json",
                "authorization": `Bearer ${userToken}`
            },
        });
        const friendsData = response.data;
        return friendsData;
    } catch (err) {
        // setError(err.message);
        console.error(err);
    }
}
async function updateUserInfo(name, bio, userToken, setError) {
    try {
        console.log("Edit user info");
        const newInfo = {
            name: name,
            bio: bio
        }
        const response = await axios.patch(`${backendURL}/user/profile`, newInfo, {
            headers: {
                "Content-Type": "application/json",
                "authorization": `Bearer ${userToken}`
            },
        });
        return response.data;
    } catch (err) {
        // setError(err.message);
        console.error(err);
    }
}
async function getFriendRequests(userToken, setError) {
    try {
        const response = await axios.get(`${backendURL}/friends/requests`, {
            headers: {
                "Content-Type": "application/json",
                "authorization": `Bearer ${userToken}`
            },
        });
        console.log(response.data);
        const friendRequests = response.data;
        return friendRequests;
    } catch (err) {
        // setError(err.message);
        console.error(err);
    }
}

async function sendFriendRequest(userID, userToken, setError) {
    try {
        const response = await axios.post(`${backendURL}/friends/requests/${userID}`, {}, {
            headers: {
                "Content-Type": "application/json",
                "authorization": `Bearer ${userToken}`
            },
        });
        alert("Friend Request Sent");
    } catch (err) {
        // setError(err.message);
        console.error(err);
    }
}
async function removeFriendRequest(senderID, userToken, setError){
    try {
        const response = await axios.delete(`${backendURL}/friends/requests/${senderID}`, {
            headers: {
                "Content-Type": "application/json",
                "authorization": `Bearer ${userToken}`
            },
        });
        console.log(response.data);
    } catch (err) {
        // setError(err.message);
        console.error(err);
    }
}
async function acceptFriendRequest(senderID, userToken, setError){
    try {
        const response = await axios.patch(`${backendURL}/friends/requests/${senderID}`, {}, {
            headers: {
                "Content-Type": "application/json",
                "authorization": `Bearer ${userToken}`
            },
        });
        console.log(response.data);
    } catch (err) {
        // setError(err.message);
        console.error(err);
    }
}
async function getFriendStatus(friendID, userToken, setError){
    try {
        const response = await axios.get(`${backendURL}/friends/status/${friendID}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${userToken}`
            },
        });
        console.log(response.data);
        return response.data;
    }
    catch(err){
        // setError(err.message);
        console.error(err);
    }
}
async function removeFriend(friendID, userToken, setError){
    try {
        const response = await axios.delete(`${backendURL}/friends/${friendID}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${userToken}`
            },
        });
        console.log(response.data);
    }
    catch(err){
        // setError(err.message);
        console.error(err);
    }
}
async function getUserPosts(userID, userToken, setError, page, limit){
    try {
        const response = await axios.get(`${backendURL}/${userID}/posts?page=${page}&limit=${limit}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${userToken}`
            },
        });
        // console.log(response.data);
        return response.data;
    }
    catch(err){
        // setError(err.message);
        console.error(err);
    }
}
export {
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
};