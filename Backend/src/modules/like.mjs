import DataBase from "./dataBase.mjs";

const db = new DataBase();
db.connect();
class Like {
    static async addPostLike(like){
        try {
            const post = await db.Post.findOne({
                where: {
                    postID: like.postID
                }
            });
            await post.createPostLike({
                userID : like.userID
            });
        }
        catch(err){
            return err;
        }
    }
    static async addCommentLike(like){
        try {
            const comment = await db.Comment.findOne({
                where: {
                    commentID: like.commentID
                }
            });
            await comment.createCommentLike({
                userID : like.userID
            });
        }
        catch(err){
            return err;
        }
    }
    static async getPostLikes(postID, offset, limit){
        try {
            const post = await db.Post.findOne({
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
            return err;
        }
    }
    static async getCommentLikes(commentID, offset, limit){
        try {
            const comment = await db.Comment.findOne({
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
            return err;
        }
    }
    static async deletePostLike(like){
        try {
            return await db.PostLike.destroy({
                where: {
                    userID: like.userID
                }
            });
        }
        catch(err){
            return err;
        }
    }
    static async deleteCommentLike(like){
        try {
            return await db.CommentLike.destroy({
                where: {
                    userID: like.userID
                }
            });
        }
        catch(err){
            return err;
        }
    }
}
export default Like;