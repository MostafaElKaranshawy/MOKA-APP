import axios from "axios";
const backendURL = import.meta.env.VITE_BACKEND_URL;

async function getPost(postID, userToken) {
    try {
        const response = await axios.get(`${backendURL}/post/${postID}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization" : `Bearer ${userToken}`
            }
        });
        const postData = response.data;
        return postData;
    } catch (error) {
        console.log(error);
    }
}

async function getPosts(userToken, page, limit) {
    try {
        const response = await axios.get(`${backendURL}/posts/feed?page=${page}&limit=${limit}`, {
            headers: {
                "Content-Type": "application/json",
                "authorization": `Bearer ${userToken}`
            },
        });
        const postsData = response.data;
        return postsData;
    } catch (error) {
        console.log(error);
        setLoading(false);
    }
}

async function addPost(content, userToken, files) {
    try {
        const formData = new FormData();
        
        Array.from(files).forEach((file) => {
            formData.append('media', file); // 'photos' must match the field name in Multer
        });
        formData.append('content', content); // Add the content text

        console.log('Files:', files);

        const response = await axios.post(`${backendURL}/post`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',  // Correct Content-Type for file uploads
                "authorization": `Bearer ${userToken}`,  // User token for authentication
            },
        });
        console.log(response.data);
    } catch (error) {
        console.log('Error uploading post:', error);
    }
}
async function deletePost(postID, userToken) {
    try {
        const response = await axios.delete(`${backendURL}/posts/${postID}`, {
            headers: {
                "Content-Type": "application/json",
                "authorization": `Bearer ${userToken}`
            },
        });
    } catch (error) {
        console.log(error);
    }
    
}

async function editPost(postID, newContent, removedPhotos ,userToken) {
    try {
        const body = {
            "content": newContent,
            removedPhotos : removedPhotos || []
        };
        const response = await axios.patch(`${backendURL}/posts/${postID}`,body, {
            headers: {
                "Content-Type": "application/json",
                "authorization": `Bearer ${userToken}`
            },
        });
    } catch (error) {
        console.log(error);
    }
    
}
async function likePost(postID, userToken) {
    try {
        const response = await axios.post(`${backendURL}/posts/${postID}/like`, {}, {
            headers: {
                "Content-Type": "application/json",
                "authorization": `Bearer ${userToken}`
            },
        });
    } catch (error) {
        console.log(error);
    }
}
async function unlikePost(postID, userToken) {
    try {
        const response = await axios.delete(`${backendURL}/posts/${postID}/like`, {
            headers: {
                "Content-Type": "application/json",
                "authorization": `Bearer ${userToken}`
            },
        });
    } catch (error) {
        console.log(error);
    }
}
async function getPostLikes(postID, userToken) {
    try {
        const response = await axios.get(`${backendURL}/posts/${postID}/likes`, {
            headers: {
                "Content-Type": "application/json",
                "authorization": `Bearer ${userToken}`
            },
        })
        const likes = response.data;
        console.log(likes)
        return likes;
    }
    catch(err){
        console.log(err)
    }
}
export {
    getPost,
    getPosts,
    addPost,
    deletePost,
    editPost,
    likePost,
    unlikePost,
    getPostLikes
}