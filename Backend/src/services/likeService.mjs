import Post from '../modules/post.mjs';
import Comment from '../modules/comment.mjs';
import PostLike from '../modules/postLike.mjs';
import CommentLike from '../modules/commentLike.mjs';

class likeService {
    static async addPostLike(like){
        try {
            const post = await Post.findOne({
                where: {
                    postID: like.postID
                }
            });
            const result = await post.createPostLike({
                userID : like.userID
            });
            if(!result){
                throw new Error("Like not added");
            }
        }
        catch(err){
            throw new Error(err.message);
        }
    }
    static async addCommentLike(like){
        try {
            const comment = await Comment.findOne({
                where: {
                    commentID: like.commentID
                }
            });
            const result = await comment.createCommentLike({
                userID : like.userID
            });
            if(!result){
                throw new Error("Like not added");
            }
        }
        catch(err){
            throw new Error(err.message);
        }
    }
    static async removePostLike(like){
        try {
            const like = await PostLike.findOne({
                where: {
                    userID: like.userID,
                    postID: like.postID
                }
            });
            if(like == null){
                throw new Error("like not found");
            }
            else{
                const result = await PostLike.destroy({
                    where: {
                        userID: like.userID,
                        postID: like.postID
                    }
                });
                if(!result){
                    throw new Error("Like not deleted");
                }
            }
        }
        catch(err){
            throw new Error(err.message);
        }
    }
    static async removeCommentLike(like){
        try {
            const like = await CommentLike.findOne({
                where: {
                    userID: like.userID,
                    commentID: like.commentID
                }
            });
            if(like == null){
                throw new Error("like not found");
            }
            else{
                const result = await CommentLike.destroy({
                    where: {
                        userID: like.userID,
                        commentID: like.commentID
                    }
                });
                if(!result){
                    throw new Error("Like not deleted");
                }
            }
        }
        catch(err){
            throw new Error(err.message);
        }
    }
    static async getPostLikes(postID, offset, limit){
        try {
            const post = await Post.findOne({
                where: {
                    postID: postID
                }
            })
            const likes = await post.getPostLikes({
                limit: limit,
                offset : offset
            });
            return likes;
        }
        catch(err){
            throw new Error(err.message);
        }
    }
    static async getCommentLikes(commentID, offset, limit){
        try {
            const comment = await Comment.findOne({
                where: {
                    commentID: commentID
                }
            })
            const likes = await comment.getCommentLikes({
                offset : offset,
                limit : limit
            });
            return likes;
        }
        catch(err){
            throw new Error(err.message);
        }
    }
}
export default likeService;