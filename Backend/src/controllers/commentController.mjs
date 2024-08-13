import commentService from '../services/commentService.mjs';
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
            return res.status(200).send("Comment updated successfully");
        }
        catch(err){
            return res.status(400).send(err.message);
        }
    }
    static async getComments(req, res){
        try {
            const postID = parseInt(req.params.postID);
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            const offset = (page - 1) * limit;
            if(isNaN(page) || isNaN(limit)){
                throw new Error("Invalid Parameters");
            }
            const comments = await commentService.getComments(postID, limit, offset);
            return res.status(200).send(comments);
        }
        catch(err){
            return res.status(400).send(err.message);
        }
    }
}

export default commentController;