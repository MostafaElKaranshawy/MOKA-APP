import likeService from '../services/likeService.mjs';

class likeController {
    static async addPostLike(req, res) {
        const like = {
            postID : req.params.postID,
            userID : req.params.userID,
        }
        try{
            const likes = await likeService.addLike(like);
            return res.status(200).send(likes);
        }
        catch(err){
            return res.status(404).send(err.message);
        }
    }
    static async addCommentLike(req, res) {
        const like = {
            commentID : req.params.postID,
            userID : req.params.userID,
        }
        try{
            const likes = await likeService.addLike(like);
            return res.status(200).send(likes);
        }
        catch(err){
            return res.status(404).send(err.message);
        }
    }
    static async removePostLike(req, res) {
        const like = {
            likeID : req.params.likeID,
            postID : req.params.postID,
            userID : req.params.userID,
        }
        try{
            const likes = await likeService.removeLike(like)
            return res.status(200).send(likes);
        }
        catch(err){
            return res.status(404).send(err.message);
        }
    }
    static async removeCommentLike(req, res) {
        const like = {
            likeID : req.params.likeID,
            commentID : req.params.commentID,
            userID : req.params.userID,
        }
        try{
            const likes = await likeService.removeLike(like)
            return res.status(200).send(likes);
        }
        catch(err){
            return res.status(404).send(err.message);
        }
    }
    static async getPostLikes(req, res) {
        try{
            if(req.params.postID != null){
                const likes = await likeService.getPostLikes(req.params.postID);
                if(likes == null)return res.status(404).send("cannot find post");
                return likes;
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
                const likes = await likeService.getCommentLikes(req.params.commentID);
                if(likes == null)return res.status(404).send("cannot find comment");
                return likes;
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