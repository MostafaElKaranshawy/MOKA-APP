import commentService from '../services/commentService.mjs';
class commentController{
    static async addComment(req, res){
        try{
            await commentService.createComment(req.params.postID, req.body.content, req.user.userID);
            return res.status(200).send("Comment created successfully");
        }
        catch(err){
            return res.status(400).send(err.message);
        }
    }
    static async deleteComment(req, res){
        try{
            await commentService.deleteComment(req.params.commentID, req.params.postID);
            return res.status(200).send("Comment deleted successfully");
        }
        catch(err){
            return res.status(400).send(err.message);
        }

    }
    static async updateComment(req, res){
        try{
            await commentService.updateComment(req.params.commentID,req.params.postID, req.body.content);
            return res.status(200).send("Comment updated successfully");
        }
        catch(err){
            return res.status(400).send(err.message);
        }
    }
    static async getComments(req, res){
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            const offset = (page - 1) * limit;
            const comments = await commentService.getComments(req.params.postID, limit, offset);
            return res.status(200).send(comments);
        }
        catch(err){
            return res.status(400).send(err.message);
        }
    }
}

export default commentController;