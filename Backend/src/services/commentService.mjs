import Comment from "../modules/comment.mjs";
import Post from "../modules/post.mjs";
class commentService {
    static async createComment(postID, content, userID) {
        const comment = {
            postID: postID,
            content: content,
            userID: userID
        }
        try {
            const post = await Post.findOne({
                where: {
                    postID: comment.postID
                }
            });
            const result = await post.createComment({
                content : comment.content,
                userID : comment.userID
            });
            if(!result){
                throw new Error("Comment not added");
            }
        }
        catch(err){
            throw new Error(err.message);
        }
    }
    static async deleteComment(userID,commentID, postID) {
        try {
            const comment = await Comment.findOne({
                where: {
                    commentID: commentID
                }
            });
            if(comment.userID != userID){
                throw new Error("Only the owner of the comment can delete it");
            }
            else{
                const result = await Comment.destroy({
                    where: {
                        commentID: commentID
                    }
                });
                if(!result){
                    throw new Error("Comment not deleted");
                }
            }
        }
        catch(err){
            throw new Error(err.message);
        }
    }
    static async updateComment(userID, commentID, postID, newContent){
        try {
            const comment = await Comment.findOne({
                where: {
                    commentID: commentID
                }
            });
            if(comment.userID != userID){
                throw new Error("Only the owner of the comment can update it");
            }
            else{
                const result = await Comment.update({
                    content: newContent
                },
                {
                    where: {
                        commentID: commentID
                    }
                });
                if(!result){
                    throw new Error("Comment not updated");
                }
            }
        }
        catch(err){
            throw new Error(err.message);
        }
    }
    static async getComments(postID, limit, offset){
        try {
            const post = await Post.findOne({
                where: {
                    postID: postID
                },
            })
            const comments = await post.getComments(
                {
                    limit: limit || 10,
                    offset: offset || 0
                }
            );
            return comments;
        }
        catch(err){
            throw new Error(err.message);
        }
    }
}

export default commentService;