import Like from "../modules/like.mjs";

class likeService {
    static async addPostLike(like){
        try{
            await Like.addPostLike(like);
            const likes = await Like.getPostLikes(like.postID);
            if(likes == null)throw new Error('cannot find post');
            return likes;
        }
        catch(err){
            throw new Error(err.message);
        }
    }
    static async addCommentLike(like){
        try{
            await Like.addCommentLike(like);
            const likes = await Like.getCommentLikes(like.commentID);
            if(likes == null)throw new Error('cannot find comment');
            return likes;
        }
        catch(err){
            throw new Error(err.message);
        }
    }
    static async removePostLike(like){
        try{
            await Like.removePostLike(like);
            const likes = await Like.getPostLikes(like.postID);
            if(likes == null)throw new Error('cannot find post');
            return likes;
        }
        catch(err){
            throw new Error(err.message);
        }
    }
    static async removeCommentLike(like){
        try{
            await Like.removeCommentLike(like);
            const likes = await Like.getCommentLikes(like.commentID);
            if(likes == null)throw new Error('cannot find comment');
            return likes;
        }
        catch(err){
            throw new Error(err.message);
        }
    }
    static async getPostLikes(postID){
        try{
            const likes = await Like.getPostLikes(postID);
            if(likes == null)throw new Error('Cannot find Post');
            return likes;
        }
        catch(err){
            throw new Error(err.message);
        }
    }
    static async getCommentLikes(commentID){
        try{
            const likes = await Like.getCommentLikes(commentID);
            if(likes == null)throw new Error('Cannot find Comment');
            return likes;
        }
        catch(err){
            throw new Error(err.message);
        }
    }
}
export default likeService;