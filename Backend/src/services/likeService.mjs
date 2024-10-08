import PostLike from '../modules/postLike.mjs';
import CommentLike from '../modules/commentLike.mjs';

class likeService {
    static async addPostLike(userID, postID){
        try {
            await PostLike.addPostLike(postID, userID);
        }
        catch(err){
            throw new Error(err.message);
        }
    }
    static async addCommentLike(userID, commentID){
        try {
            await CommentLike.addCommentLike(userID, commentID);
        }
        catch(err){
            throw new Error(err.message);
        }
    }
    static async removePostLike(userID, postID){
        try {
            await PostLike.removePostLike(userID, postID);
        }
        catch(err){
            throw new Error(err.message);
        }
    }
    static async removeCommentLike(userID, commentID){
        try {
            await CommentLike.removeCommentLike(userID, commentID);
        }
        catch(err){
            throw new Error(err.message);
        }
    }
    static async getPostLikes(postID){
        try {
            const likes = await PostLike.getPostLikes(postID);
            return likes;
        }
        catch(err){
            throw new Error(err.message);
        }
    }
    static async getCommentLikes(commentID){
        try {
            const likes = await CommentLike.getCommentLikes(commentID);
            return likes;
        }
        catch(err){
            throw new Error(err.message);
        }
    }
}
export default likeService;