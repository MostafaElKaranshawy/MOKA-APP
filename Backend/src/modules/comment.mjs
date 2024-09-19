import CommentDefinition from './definitions/commentDefinition.mjs';
import PostDefinition from './definitions/postDefinition.mjs';
import UserDefinition from './definitions/userDefinition.mjs';
import Notification from './notification.mjs';
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
        post.increment('comments');
        await post.reload();
        if(userID == post.userID)return result;
        await Notification.addNotification(userID, post.userID, 'comment', 'commented on your post', postID);
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
        if(comment.userID != userID && post.userID != userID){
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
        post.decrement('comments');
        await post.reload();
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
        if(comment.userID != userID){
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
    static async getComments(userID, postID){
        const post = await PostDefinition.findOne({
            where: {
                postID: postID
            }
        });
        if(!post){
            throw new Error("Post not found");
        }
        const user = await UserDefinition.findOne({
            where: {
                userID: userID
            }
        });
        const userCommentLikes = await user.getCommentLikes(); 
        let comments = await post.getPostComments({
                include: [
                    {
                        model: UserDefinition, 
                        attributes: [['name', 'authorName'], 'profilePhotoURL', 'userName'], 
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
                profilePhotoURL: comment.user.dataValues.profilePhotoURL,
                userName: comment.user.dataValues.userName,
                time: new Date(comment.createdAt),
            }
        });
        return comments;
    }
}