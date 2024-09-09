import axios from "axios";

async function changeProfilePhoto(formData, userToken) {
    try {
        const response = await axios.post(`http://localhost:4000/user/profilePhoto`, formData , {
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
        const response = await axios.patch(`http://localhost:4000/user/settings`, formData, {
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
        const response = await axios.get(`http://localhost:4000/users/search?search=${query}`, {
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
export {
    changeProfilePhoto,
    editUserSettings,
    searchUsers
}