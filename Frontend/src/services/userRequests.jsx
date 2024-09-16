import axios from "axios";
const backendURL = import.meta.env.VITE_BACKEND_URL;

async function changeProfilePhoto(formData, userToken) {
    try {
        const response = await axios.post(`${backendURL}/user/profilePhoto`, formData , {
            headers: {
                "authorization": `Bearer ${userToken}`
            },
        });
        console.log(response)
        console.log(response)
        return response.data.newUserData;
    } catch (error) {
        console.error('Error uploading file:', error);
    }
}

async function editUserSettings(formData, userToken) {
    let submitButton = document.getElementsByClassName('save-changes-button');
    submitButton.disabled = true;
    try {
        const response = await axios.patch(`${backendURL}/user/settings`, formData, {
            headers: {
                "Content-Type": "application/json",
                "authorization": `Bearer ${userToken}`
            },
        });            
        const newUserData = response.data
        return newUserData;
    }
    catch(err){
        console.log(err)
        const error = err.response.data;
        throw new Error(error.message)
    } 
}
async function searchUsers(query, token){
    try {
        const response = await axios.get(`${backendURL}/users/search?search=${query}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });
        const data = await response.data;
        return data;
    } catch (error) {
        console.error(error);
    }
}
async function getNotifications(token){
    try {
        const response = await axios.get(`${backendURL}/user/notifications`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });
        const data = response.data;
        return data;
    }
    catch(err){
        console.error(err);
    }
}
async function seeNotification(notificationID, token){
    try {
        console.log(notificationID)
        console.log(token)
        await axios.patch(`${backendURL}/user/notification/${notificationID}/seen`, {},{
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });
    }
    catch(err){
        console.error(err);
    }
}
export {
    changeProfilePhoto,
    editUserSettings,
    searchUsers,
    getNotifications,
    seeNotification
}