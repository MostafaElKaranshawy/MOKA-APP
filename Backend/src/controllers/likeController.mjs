import likeService from '../services/likeService.mjs';

class likeController {
    static async addPostLike(req, res) {
        const like = {
            postID : req.params.postID,
            userID : req.user.userID,
        }
        try{
            await likeService.addPostLike(like);
            return res.status(200).send("like added successfully");
        }
        catch(err){
            return res.status(404).send(err.message);
        }
    }
    static async addCommentLike(req, res) {
        const like = {
            commentID : req.params.postID,
            userID : req.user.userID,
        }
        try{
            await likeService.addCommentLike(like);
            return res.status(200).send("like added successfully");
        }
        catch(err){
            return res.status(404).send(err.message);
        }
    }
    static async removePostLike(req, res) {
        const like = {
            postID : req.params.postID,
            userID : req.user.userID,
        }
        try{
            await likeService.removePostLike(like)
            return res.status(200).send("like removed successfully");
        }
        catch(err){
            return res.status(404).send(err.message);
        }
    }
    static async removeCommentLike(req, res) {
        const like = {
            likeID : req.params.likeID,
            commentID : req.params.commentID,
            userID : req.user.userID,
        }
        try{
            await likeService.removeCommentLike(like)
            return res.status(200).send("like removed successfully");
        }
        catch(err){
            return res.status(404).send(err.message);
        }
    }
    static async getPostLikes(req, res) {
        try{
            if(req.params.postID != null){
                const page = parseInt(req.query.page) || 1;
                const limit = parseInt(req.query.limit) || 10;
                const offset = (page - 1) * limit;
                const likes = await likeService.getPostLikes(req.params.postID, offset, limit);
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
                const page = parseInt(req.query.page) || 1;
                const limit = parseInt(req.query.limit) || 10;
                const offset = (page - 1) * limit;
                const likes = await likeService.getCommentLikes(req.params.commentID, offset, limit);
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