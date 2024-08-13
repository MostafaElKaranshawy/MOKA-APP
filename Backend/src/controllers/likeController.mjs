import likeService from '../services/likeService.mjs';

class likeController {
    static async addPostLike(req, res) {
        const postID = parseInt(req.params.postID);
        const userID = req.user.userID;
        if(isNaN(postID || userID == null)){
            return res.status(404).send("Invalid Parameters");
        }
        try{
            await likeService.addPostLike(userID, postID);
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
                const page = parseInt(req.query.page) || 1;
                const limit = parseInt(req.query.limit) || 10;
                if(isNaN(postID) || isNaN(page) || isNaN(limit)){
                    return res.status(404).send("Invalid Parameters");
                }

                const offset = (page - 1) * limit;
                const likes = await likeService.getPostLikes(postID, offset, limit);
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