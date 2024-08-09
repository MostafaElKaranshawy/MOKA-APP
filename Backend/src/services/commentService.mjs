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
            throw new Error(err.msg);
        }
    }
    static async deleteComment(commentID, postID) {
        try{
            await Comment.deleteComment(commentID, postID);
        }
        catch(err){
            throw new Error(err.msg);
        }
    }
    static async updateComment(commentID, postID, newContent){
        try{
            await Comment.updateComment(commentID, newContent);
        }
        catch(err){
            throw new Error(err.msg);
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