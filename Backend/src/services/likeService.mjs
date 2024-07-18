import Like from "../modules/like.mjs";

class likeService {
    static async addLike(like){
        try{
            await Like.addLike(like);
            if(like.postID != null){
                const likes = Like.getPostLikes(like.postID);
                if(likes == null)throw new Error('cannot find post');
                return likes;
            }
            else if(like.commentID != null){
                const likes = Like.getCommentLikes(like.postID);
                if(likes == null)throw new Error('cannot find comment');
                return likes;
            }
        }
        catch(err){
            throw new Error(err.message);
        }
    }
    static async removeLike(like){
        // console.log(like.likeID);
        try{
            await Like.removeLike(like);
            if(like.postID != null){
                const likes = Like.getPostLikes(like.postID);
                if(likes == null)throw new Error('cannot find post');
                return likes;
            }
            else if(like.commentID != null){
                const likes = Like.getCommentLikes(like.postID);
                if(likes == null)throw new Error('cannot find comment');
                return likes;
            }
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