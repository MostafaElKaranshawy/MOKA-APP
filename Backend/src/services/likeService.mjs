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
            const result = await PostLike.removePostLike(userID, postID);
            if(!result){
                throw new Error("Like not Exist");
            }
        }
        catch(err){
            throw new Error(err.message);
        }
    }
    static async removeCommentLike(userID, commentID){
        try {
            const result = await CommentLike.removeCommentLike(userID, commentID);
        }
        catch(err){
            throw new Error(err.message);
        }
    }
    static async getPostLikes(postID, offset, limit){
        try {
            const likes = await PostLike.getPostLikes(postID, offset, limit);
            return likes;
        }
        catch(err){
            throw new Error(err.message);
        }
    }
    static async getCommentLikes(commentID, offset, limit){
        try {
            const likes = await comment.getCommentLikes(commentID, offset, limit);
            return likes;
        }
        catch(err){
            throw new Error(err.message);
        }
    }
}
export default likeService;