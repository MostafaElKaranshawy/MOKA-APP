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
            if(!post){
                throw new Error("Post not found");
            }
            const [result, created] = await PostLike.findOrCreate({
                where: {
                    userID: like.userID,
                    postID: like.postID
                }
            });
            if(!created){
                throw new Error("Like already exists");

            }
            await result.setPost(post);
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
            if(!comment){
                throw new Error("Comment not found");
            }
            console.log(like.commentID, like.userID);
            const [result, created] = await CommentLike.findOrCreate({
                where: {
                    commentID: like.commentID,
                    userID: like.userID
                }
            });
            if(!created){
                throw new Error("Like already exists");
            }
            await result.setComment(comment);

            if(!result){
                throw new Error("Like not added");
            }
        }
        catch(err){
            throw new Error(err.message);
        }
    }
    static async removePostLike(likeDTO){
        try {
            const result = await PostLike.destroy({
                where: {
                    userID: likeDTO.userID,
                    postID: likeDTO.postID
                }
            });
            if(!result){
                throw new Error("Like not Exist");
            }
        }
        catch(err){
            throw new Error(err.message);
        }
    }
    static async removeCommentLike(likeDTO){
        try {
            const result = await CommentLike.destroy({
                where: {
                    userID: likeDTO.userID,
                    commentID: likeDTO.commentID
                }
            });
            if(!result){
                throw new Error("Like not Exist");
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
            if(!comment){
                throw new Error("Comment not found");
            }
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