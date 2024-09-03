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

async function addPost(content, userToken) {
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
        
    } catch (error) {
        console.log(error);
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

export {
    getPosts,
    addPost,
    deletePost,
    editPost,
    likePost,
    unlikePost
}