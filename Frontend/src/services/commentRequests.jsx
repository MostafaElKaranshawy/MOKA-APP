import axios from 'axios'

async function getComments(postID, userToken){
    try {
        const response = await axios.get(`http://localhost:4000/posts/${postID}/comments`, {
            headers: {
                "Content-Type": "application/json",
                "authorization": `Bearer ${userToken}`
            },
        });
        const commentsData = response.data;
        return commentsData;
    } catch (error) {
        console.log(error);
    }
}
async function createComment(content, postID, userToken){
    try {
        const newComment = {
            "content": content
        };
        const response = await axios.post(`http://localhost:4000/posts/${postID}/comment`, newComment, {
            headers: {
                "Content-Type": "application/json",
                "authorization": `Bearer ${userToken}`
            },
        });
    } catch (error) {
        console.log(error);
    }
}

async function deleteComment(commentID, postID, userToken) {
    try {
        console.log(commentID);
        const response = await axios.delete(`http://localhost:4000/posts/${postID}/comments/${commentID}`, {
            headers: {
                "Content-Type": "application/json",
                "authorization": `Bearer ${userToken}`
            },
        });
    } catch (error) {
        console.log(error);
    }
}

async function editComment(commentID, newContent, postID, userToken) {
    try {
        const body = {
            "content": newContent
        };
        console.log(commentID);
        const response = await axios.patch(`http://localhost:4000/posts/${postID}/comments/${commentID}`, body, {
            headers: {
                "Content-Type": "application/json",
                "authorization": `Bearer ${userToken}`
            },
        });
    } catch (error) {
        console.log(error);
    }
}

async function likeComment(commentID, postID, userToken) {
    try {
        console.log("commentID: ", commentID);
        const response = await axios.post(`http://localhost:4000/posts/${postID}/comments/${commentID}/like`, {}, {
            headers: {
                "Content-Type": "application/json",
                "authorization": `Bearer ${userToken}`
            },
        });
    } catch (error) {
        console.log(error);
    }
}

async function unlikeComment(commentID, postID, userToken) {
    try {
        console.log("commentID: ", commentID);
        const response = await axios.delete(`http://localhost:4000/posts/${postID}/comments/${commentID}/like`, {
            headers: {
                "Content-Type": "application/json",
                "authorization": `Bearer ${userToken}`
            },
        });
    } catch (error) {
        console.log(error);
    }
}

export{
    getComments,
    createComment,
    deleteComment,
    editComment,
    likeComment,
    unlikeComment
}