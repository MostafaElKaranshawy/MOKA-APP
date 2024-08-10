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
            throw new Error(err.message);
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
            throw new Error(err.message);
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
            throw new Error(err.message);
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
            throw new Error(err.message);
        }
    }
    static async deletePostLike(userID, postID){
        try {
            const like = db.PostLike.findOne({
                where: {
                    userID: userID,
                    postID: postID
                }
            });
            if(like == null){
                throw new Error("like not found");
            }
            else{
                await db.PostLike.destroy({
                    where: {
                        userID: userID,
                        postID: postID
                    }
                });
            }
        }
        catch(err){
            throw new Error(err.message);
        }
    }
    static async deleteCommentLike(userID, commentID){
        try {
            const like = db.CommentLike.findOne({
                where: {
                    userID: userID,
                    commentID: commentID
                }
            });
            if(like == null){
                throw new Error("like not found");
            }
            else{
                await db.CommentLike.destroy({
                    where: {
                        userID: userID,
                        commentID: commentID
                    }
                });
            }
        }
        catch(err){
            throw new Error(err.message);
        }
    }
}
export default Like;