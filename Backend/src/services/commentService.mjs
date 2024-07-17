import User from "../modules/user.mjs";
import Comment from "../modules/comment.mjs";

class commentService {
    static async createComment(postID, content) {
        const comment = {
            postID: postID,
            content: content
        }
        return comment;
    }
    static async deleteComment(commentID, postID) {
        await Comment.deleteComment(commentID);
        const comments = await Comment.getComments(postID);
        if(comments != null) return comments;
        else throw new Error("Post Not Found");
    }
    static async updateComment(commentID, postID, newContent){
        await Comment.updateComment(commentID, newContent);
        const comments = await Comment.getComments(postID);
        if(comments != null) return comments;
        else throw new Error("Post Not Found");
    }
}

export default commentService;