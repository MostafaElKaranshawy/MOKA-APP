import DataBase from "./dataBase.mjs";

const db = new DataBase();
db.connect();
class Comment{
    static async addComment(comment){
        try {
            const post = await db.Post.findOne({
                where: {
                    postID: comment.postID
                }
            });
            console.log(comment.content);
            await post.createComment({
                content : comment.content,
                userID : comment.userID
            });
        }
        catch(err){
            throw new Error(err.message);
        }
    }
    static async getComments(postID, limit, offset){
        try {
            const post = await db.Post.findOne({
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
    static async deleteComment(userID,commentID, postID){
        try {
            const comment = await db.Comment.findOne({
                where: {
                    commentID: commentID
                }
            });
            if(comment.userID != userID){
                throw new Error("Only the owner of the comment can delete it");
            }
            else{
                await db.Comment.destroy({
                    where: {
                        commentID: commentID
                    }
                });
            }
        }
        catch(err){
            throw new Error(err.message);
        }
    }
    static async updateComment(userID, commentID, newContent){
        try {
            const comment = await db.Comment.findOne({
                where: {
                    commentID: commentID
                }
            });
            if(comment.userID != userID){
                throw new Error("Only the owner of the comment can update it");
            }
            else{
                await db.Comment.update({
                    content: newContent
                },
                {
                    where: {
                        commentID: commentID
                    }
                });
            }
        }
        catch(err){
            throw new Error(err.message);
        }
    }
    static async deletePostComments(postID){
        try {
            return await db.Comment.destroy({
                where: {
                    postID: postID
                }
            });
        }
        catch(err){
            throw new Error(err.message);
        }
    }
}
export default Comment;