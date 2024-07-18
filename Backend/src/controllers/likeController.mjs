import likeService from '../services/likeService.mjs';

class likeController {
    static async addLike(req, res) {
        const like = {
            postID : req.body.postID,
            commentID : req.body.commentID,
            userID : req.body.userID,
            type : req.body.type
        }
        try{
            const likes = await likeService.addLike(like);
            return res.status(200).send(likes);
        }
        catch(err){
            return res.status(404).send(err.message);
        }
    }
    static async removeLike(req, res) {
        const like = {
            likeID : req.body.likeID,
            postID : req.body.postID,
            commentID : req.body.commentID,
            userID : req.body.userID,
            type : req.body.type
        }
        try{
            const likes = await likeService.removeLike(like)
            return res.status(200).send(likes);
        }
        catch(err){
            return res.status(404).send(err.message);
        }
    }
    static async getLikes(req, res) {
        try{
            if(req.body.postID != null){
                const likes = await likeService.getPostLikes(req.body.postID);
                if(likes == null)return res.status(404).send("cannot find post");
                return likes;
            }
            else if(req.body.commentID != null){
                const likes = await likeService.getCommentLikes(req.body.commentID);
                if(likes == null)return res.status(404).send("cannot find comment");
                return likes;
            }
        }
        catch(err){
            return res.status(404).send(err.message);
        }
    }
}

export default likeController;