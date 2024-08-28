import CommentDefinition from './definitions/commentDefinition.mjs';
import PostDefinition from './definitions/postDefinition.mjs';
import UserDefinition from './definitions/userDefinition.mjs';
import { format } from 'date-fns';
export default class Comment{
    static async createComment(postID, content, userID){
        const post = await PostDefinition.findOne({
            where: {
                postID: postID
            }
        });
        if(post == null)throw new Error("Post not found")
        const result = await post.createPostComment({
            content: content,
            userID: userID
        });
        if(!result){
            throw new Error("Comment not added");
        }
        post.comments += 1;
        await post.save();
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
        post.comments -= 1;
        await post.save();
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
        const user = await post.getUser();
        const userCommentLikes = await user.getCommentLikes(); 
        let comments = await post.getPostComments({
                limit: limit || 10,
                offset: offset || 0,
                include: [
                    {
                        model: UserDefinition, 
                        attributes: [['name', 'authorName']], 
                    }
                ]
            }
        );
        comments = comments.map(comment => {
            return {
                commentID: comment.commentID,
                content: comment.content,
                userID: comment.userID,
                likes: comment.likes,
                authorName : comment.user.dataValues.authorName,
                liked: userCommentLikes.find(like => like.commentID == comment.commentID) ? true : false,
                time : format(new Date(post.createdAt), 'dd-mm-yyyy HH:mm:ss'),
            }
        });
        return comments;
    }
}