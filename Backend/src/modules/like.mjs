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
            await post.createLike({
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
            await comment.createLike({
                userID : like.userID
            });
        }
        catch(err){
            return err;
        }
    }
    static async getPostLikes(postID){
        try {
            const post = await db.Post.findOne({
                where: {
                    postID: postID
                }
            })
            const likes = await post.getLikes();
            return likes;
        }
        catch(err){
            return err;
        }
    }
    static async getCommentLikes(commentID){
        try {
            const comment = await db.Comment.findOne({
                where: {
                    commentID: commentID
                }
            })
            const likes = await comment.getLikes();
            return likes;
        }
        catch(err){
            return err;
        }
    }
    static async deletePostLike(likeID){
        try {
            return await db.PostLike.destroy({
                where: {
                    postLikeID: likeID
                }
            });
        }
        catch(err){
            return err;
        }
    }
    static async deleteCommentLike(likeID){
        try {
            return await db.CommentLike.destroy({
                where: {
                    commentLikeID: likeID
                }
            });
        }
        catch(err){
            return err;
        }
    }
}
export default Like;