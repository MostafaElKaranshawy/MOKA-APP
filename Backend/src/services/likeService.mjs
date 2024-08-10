import Like from "../modules/like.mjs";

class likeService {
    static async addPostLike(like){
        try{
            await Like.addPostLike(like);
        }
        catch(err){
            throw new Error(err.message);
        }
    }
    static async addCommentLike(like){
        try{
            await Like.addCommentLike(like);
        }
        catch(err){
            throw new Error(err.message);
        }
    }
    static async removePostLike(like){
        try{
            await Like.deletePostLike(like.userID, like.postID);
        }
        catch(err){
            throw new Error(err.message);
        }
    }
    static async removeCommentLike(like){
        try{
            await Like.deleteCommentLike(like.userID, like.commentID);
        }
        catch(err){
            throw new Error(err.message);
        }
    }
    static async getPostLikes(postID, offset, limit){
        try{
            const likes = await Like.getPostLikes(postID, offset, limit);
            if(likes == null)throw new Error('Cannot find Post');
            return likes;
        }
        catch(err){
            throw new Error(err.message);
        }
    }
    static async getCommentLikes(commentID, offset, limit){
        try{
            const likes = await Like.getCommentLikes(commentID, offset, limit);
            if(likes == null)throw new Error('Cannot find Comment');
            return likes;
        }
        catch(err){
            throw new Error(err.message);
        }
    }
}
export default likeService;