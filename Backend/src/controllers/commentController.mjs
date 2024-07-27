import Comment from '../modules/comment.mjs';
import commentService from '../services/commentService.mjs';
import User from '../modules/user.mjs';
class commentController{
    static async addComment(req, res){
        try{
            const comment = await commentService.createComment(req.params.postID, req.params.content);
            await Comment.addComment(comment);
            const comments = await Comment.getComments(comment.postID);
            return res.status(200).send(comments);
        }
        catch(err){
            return res.status(400).send(err.message);
        }
    }
    static async deleteComment(req, res){
        try{
            const comments = await commentService.deleteComment(req.params.commentID, req.params.postID);
            return res.status(200).send(comments);
        }
        catch(err){
            return res.status(400).send(err.message);
        }

    }
    static async updateComment(req, res){
        try{
            const comments = await commentService.updateComment(req.params.commentID,req.params.postID, req.body.content);
            return res.status(200).send(comments);
        }
        catch(err){
            return res.status(400).send(err.message);
        }
    }
    static async getComments(req, res){
        try {
            const comments = await Comment.getComments(req.body.postID);
            return res.status(200).send(comments);
        }
        catch(err){
            return res.status(400).send(err.message);
        }
    }
}

export default commentController;