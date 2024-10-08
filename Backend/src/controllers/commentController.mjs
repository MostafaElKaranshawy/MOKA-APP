import commentService from '../services/commentService.mjs';
import {eventEmitter} from '../config/wss.mjs';
class commentController{
    static async addComment(req, res){
        try{
            const userID = req.user.userID;
            const content = req.body.content;
            const postID = parseInt(req.params.postID);
            if(userID == null || content == null || postID == null || isNaN(postID)){
                throw new Error("Invalid Parameters");
            }

            await commentService.createComment(postID, content, userID);
            // eventEmitter.emit('broadcast', `${req.user.name} added a new Comment`);
            return res.status(200).send("Comment created successfully");
        }
        catch(err){
            return res.status(400).send(err.message);
        }
    }
    static async deleteComment(req, res){
        try{
            const userID = req.user.userID;
            const commentID = parseInt(req.params.commentID);
            const postID = parseInt(req.params.postID);
            if(userID == null || commentID == null || isNaN(commentID) || postID == null || isNaN(postID)){
                throw new Error("Invalid Parameters");
            }
            await commentService.deleteComment(userID, commentID, postID);
            // eventEmitter.emit('broadcast', `${req.user.name} deleted a Comment`);
            return res.status(200).send("Comment deleted successfully");
        }
        catch(err){
            return res.status(400).send(err.message);
        }

    }
    static async updateComment(req, res){
        try{
            const userID = req.user.userID;
            const commentID = parseInt(req.params.commentID);
            const postID = parseInt(req.params.postID);
            const content = req.body.content;
            if(userID == null || commentID == null || isNaN(commentID) || postID == null || isNaN(postID) || content == null){
                throw new Error("Invalid Parameters");
            }
            await commentService.updateComment(userID, commentID, postID, content);
            // eventEmitter.emit('broadcast', `${req.user.name} updated a Comment`);
            return res.status(200).send("Comment updated successfully");
        }
        catch(err){
            return res.status(400).send(err.message);
        }
    }
    static async getComments(req, res){
        try {
            const userID = req.user.userID;
            const postID = parseInt(req.params.postID);            
            const comments = await commentService.getComments(userID, postID);
            return res.status(200).send(comments);
        }
        catch(err){
            return res.status(400).send(err.message);
        }
    }
}

export default commentController;