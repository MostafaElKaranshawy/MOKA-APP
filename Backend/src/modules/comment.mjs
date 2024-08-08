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
            await post.createComment({
                content : comment.content
            });
        }
        catch(err){
            return err;
        }
    }
    static async getComments(postID){
        try {
            const post = await db.Post.findOne({
                where: {
                    postID: postID
                }
            })
            const comments = await post.getComments();
            return comments;
        }
        catch(err){
            return err;
        }
    }
    static async deleteComment(commentID){
        try {
            return await db.Comment.destroy({
                where: {
                    commentID: commentID
                }
            });
        }
        catch(err){
            return err;
        }
    }
    static async updateComment(commentID, newContent){
        try {
            await db.Comment.update({
                content: newContent
            },
            {
                where: {
                    commentID: commentID
                }
            });
            
        }
        catch(err){
            return err;
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
            return err;
        }
    }
}
export default Comment;