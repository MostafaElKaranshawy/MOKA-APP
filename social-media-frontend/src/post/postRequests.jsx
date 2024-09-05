import axios from "axios";
async function getPosts(userToken, page, limit) {
    try {
        const response = await axios.get(`http://localhost:4000/posts/feed?page=${page}&limit=${limit}`, {
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
            formData.append('photos', file); // 'photos' must match the field name in Multer
        });
        formData.append('content', content); // Add the content text

        console.log('Files:', files);
        // for (let pair of formData.entries()) {
        //     console.log(pair[0] + ', ' + pair[1]); // Logs the FormData key-value pairs
        // }

        const response = await axios.post("http://localhost:4000/post", formData, {
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
        const response = await axios.delete(`http://localhost:4000/posts/${postID}`, {
            headers: {
                "Content-Type": "application/json",
                "authorization": `Bearer ${userToken}`
            },
        });
    } catch (error) {
        console.log(error);
    }
    
}

async function editPost(postID, newContent, userToken) {
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
    } catch (error) {
        console.log(error);
    }
    
}
async function likePost(postID, userToken) {
    try {
        const response = await axios.post(`http://localhost:4000/posts/${postID}/like`, {}, {
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
        const response = await axios.delete(`http://localhost:4000/posts/${postID}/like`, {
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
        const response = await axios.get(`http://localhost:4000/posts/${postID}/likes`, {
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
    getPosts,
    addPost,
    deletePost,
    editPost,
    likePost,
    unlikePost,
    getPostLikes
}