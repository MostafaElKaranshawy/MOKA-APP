import CommentDefintion from './definitions/commentDefinition.mjs';
import CommentLikeDefinition from './definitions/commentLikeDefinition.mjs';
import commentLikeDefinition from './definitions/commentLikeDefinition.mjs';
export default class CommentLike {
    static async addCommentLike(userID, commentID){
        const comment = await CommentDefintion.findOne({
            where: {
                commentID: commentID
            }
        });
        if(!comment){
            throw new Error("Comment not found");
        }
        const [like, created] = await CommentLikeDefinition.findOrCreate({
            where: {
                commentID: commentID,
                userID: userID
            }
        });
        if(!created){
            throw new Error("Like already exists");
        }
        if(!like){
            throw new Error("Like not added");
        }
        comment.likes += 1;
        await comment.save();
        like.setComment(comment);
        return created;
    }
    static async removeCommentLike(userID, commentID){
        const comment = await CommentDefintion.findOne({
            where: {
                commentID: commentID,
            }
        });
        if(!comment){
            throw new Error("Comment not found");
        }
        const like = await CommentLikeDefinition.findOne({
            where: {
                userID: userID,
                commentID: commentID
            }
        });
        if(!like){
            throw new Error("Like not Exist");
        }
        if(userID != like.userID){
            throw new Error("You are not authorized to remove this like");
        }
        const result = await CommentLikeDefinition.destroy({
            where: {
                userID: userID,
                commentID: commentID
            }
        });
        if(!result){
            throw new Error("Like not Exist");
        }
        comment.likes -= 1;
        await comment.save();
        return result;
    }
    static async getCommentLikes(commentID, offset, limit){
        const comment = await CommentDefintion.findOne({
            where: {
                commentID: commentID
            }
        });
        if(!comment){
            throw new Error("Comment not found");
        }
        const likes = await comment.getCommentLikes({
            limit: limit,
            offset: offset
        });
        return likes;
    }
}