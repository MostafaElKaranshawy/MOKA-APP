import Comment from "../modules/comment.mjs";

class commentService {
    static async createComment(postID, content, userID) {
        const comment = {
            postID: postID,
            content: content,
            userID: userID
        }
        try{
            await Comment.addComment(comment);
        }
        catch(err){
            throw new Error(err.message);
        }
    }
    static async deleteComment(userID,commentID, postID) {
        try{
            await Comment.deleteComment(userID,commentID, postID);
        }
        catch(err){
            throw new Error(err.message);
        }
    }
    static async updateComment(userID, commentID, postID, newContent){
        try{
            await Comment.updateComment(userID,commentID, newContent);
        }
        catch(err){
            throw new Error(err.message);
        }
    }
    static async getComments(postID, limit, offset){
        try{
            const comments = await Comment.getComments(postID, limit, offset);
            if(comments != null) return comments;
            else throw new Error("Post Not Found");
        }
        catch(err){throw new Error("Post Not Found");}
    }
}

export default commentService;