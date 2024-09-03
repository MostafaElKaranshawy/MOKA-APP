import Comment from "../modules/comment.mjs";

class commentService {
    static async createComment(postID, content, userID) {
        try {
            if(userID == null || content == null || postID == null || isNaN(postID)){
                throw new Error("Invalid Parameters");
            }
            const res = await Comment.createComment(postID, content, userID);
            if(!res){
                throw new Error("Comment not added");
            }
        }
        catch(err){
            console.log(err);
            throw new Error(err.message);
        }
    }
    static async deleteComment(userID,commentID, postID) {
        try {
            if(userID == null || commentID == null || isNaN(commentID) || postID == null || isNaN(postID)){
                throw new Error("Invalid Parameters");
            }
            const res = await Comment.deleteComment(userID, postID, commentID);
            if(!res){
                throw new Error("Comment not deleted");
            }
        }
        catch(err){
            throw new Error(err.message);
        }
    }
    static async updateComment(userID, commentID, postID, newContent){
        try {
            if(userID == null || commentID == null || isNaN(commentID) || postID == null || isNaN(postID) || newContent == null){
                throw new Error("Invalid Parameters");
            }
            const res = await Comment.updateComment(userID, commentID, postID, newContent);
            if(!res){
                throw new Error("Comment not updated");
            }
        }
        catch(err){
            throw new Error(err.message);
        }
    }
    static async getComments(userID, postID){
        try {
            const comments = await Comment.getComments(userID, postID);
            return comments;
        }
        catch(err){
            throw new Error(err.message);
        }
    }
}

export default commentService;