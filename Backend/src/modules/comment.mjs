import CommentDefinition from './definitions/commentDefinition.mjs';
import PostDefinition from './definitions/postDefinition.mjs';

export default class Comment {
    static async createComment(postID, content, userID){
        const post = await PostDefinition.findOne({
            where: {
                postID: postID
            }
        });
        const result = await post.createComment({
            content: content,
            userID: userID
        });
        if(!result){
            throw new Error("Comment not added");
        }
        return result;
    }
    static async deleteComment(userID, postID, commentID){
        const comment = await CommentDefinition.findOne({
            where: {
                commentID: commentID
            }
        });
        if(!comment){
            throw new Error("Comment not found");
        }
        const post = await PostDefinition.findOne({
            where: {
                postID: postID
            }
        });
        if(comment.userID != userID || post.userID != userID){
            throw new Error("Only the owner of the comment or the post can delete it");
        }
        const result = await CommentDefinition.destroy({
            where: {
                commentID: commentID
            }
        });
        if(!result){
            throw new Error("Comment not deleted");
        }
        return result;
    }
    static async updateComment(userID, commentID, postID, newContent){
        const comment = await CommentDefinition.findOne({
            where: {
                commentID: commentID
            }
        });
        if(!comment){
            throw new Error("Comment not found");
        }
        const post = await PostDefinition.findOne({
            where: {
                postID: postID
            }
        });
        if(comment.userID != userID || post.userID != userID){
            throw new Error("Only the owner of the comment or the post can update it");
        }
        const result = await CommentDefinition.update({
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
        return result;
    }
    static async getComments(postID, limit, offset){
        const post = await PostDefinition.findOne({
            where: {
                postID: postID
            }
        });
        if(!post){
            throw new Error("Post not found");
        }
        const comments = await post.getComments({
            limit: limit || 10,
            offset: offset || 0
        });
        return comments;
    }
}