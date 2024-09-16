import likeService from '../services/likeService.mjs';
import {eventEmitter} from '../config/wss.mjs';
class likeController {
    static async addPostLike(req, res) {
        const postID = parseInt(req.params.postID);
        const userID = req.user.userID;
        if(isNaN(postID || userID == null)){
            return res.status(404).send("Invalid Parameters");
        }
        try{
            await likeService.addPostLike(userID, postID);
            // eventEmitter.emit('broadcast', `${req.user.name} liked a Post`);
            return res.status(200).send("like added successfully");
        }
        catch(err){
            return res.status(404).send(err.message);
        }
    }
    static async addCommentLike(req, res) {
        const commentID = parseInt(req.params.commentID);
        const userID = req.user.userID;
        if(isNaN(commentID || userID == null)){
            return res.status(404).send("Invalid Parameters");
        }
        try{
            await likeService.addCommentLike(userID, commentID);
            // eventEmitter.emit('broadcast', `${req.user.name} liked a Comment`);
            return res.status(200).send("like added successfully");
        }
        catch(err){
            return res.status(404).send(err.message);
        }
    }
    static async removePostLike(req, res) {
        const postID = parseInt(req.params.postID);
        const userID = req.user.userID;
        if(isNaN(postID || userID == null)){
            return res.status(404).send("Invalid Parameters");
        }

        try{
            await likeService.removePostLike(userID, postID);
            // eventEmitter.emit('broadcast', `${req.user.name} unliked a Post`);
            return res.status(200).send("like removed successfully");
        }
        catch(err){
            return res.status(404).send(err.message);
        }
    }
    static async removeCommentLike(req, res) {
        const commentID = parseInt(req.params.commentID)
        const userID = req.user.userID
        if(isNaN(commentID) || userID == null){
            return res.status(404).send("Invalid Parameters");
        }
        try{
            await likeService.removeCommentLike(userID, commentID);
            // eventEmitter.emit('broadcast', `${req.user.name} unliked a Comment`);
            return res.status(200).send("like removed successfully");
        }
        catch(err){
            return res.status(404).send(err.message);
        }
    }
    static async getPostLikes(req, res) {
        try{
            if(req.params.postID != null){
                const postID = parseInt(req.params.postID);
                const likes = await likeService.getPostLikes(postID);
                if(likes == null)return res.status(404).send("cannot find post");
                return res.status(200).send(likes);
            }
            else{
                return res.status(404).send("cannot find post");
            }
        }
        catch(err){
            return res.status(404).send(err.message);
        }
    }
    static async getCommentLikes(req, res) {
        try{
            if(req.params.commentID != null){
                const commentID = parseInt(req.params.commentID);
                const likes = await likeService.getCommentLikes(commentID);
                if(likes == null)return res.status(404).send("cannot find comment");
                return res.status(200).send(likes);
            }
            else{
                return res.status(404).send("cannot find comment");
            }
        }
        catch(err){
            return res.status(404).send(err.message);
        }
    }
}

export default likeController;