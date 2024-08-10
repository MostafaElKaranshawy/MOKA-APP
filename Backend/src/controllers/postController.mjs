import PostService from '../services/postService.mjs';
class PostController{
    static async addPost(req, res){
        try{
            // console.log(req.user.userID);
            await PostService.createPost(req.user.userID, req.body.content);
            return res.status(200).send("Post Created Successfully");
        }
        catch(err){
            return res.status(400).send(err.message);
        }
    }
    static async deletePost(req, res){
        try{
            await PostService.deletePost(req.user.userID, req.params.postID);
            return res.status(200).send("Post Deleted Successfully");
        }
        catch(err){
            // console.log(err);
            return res.status(400).send(err.message);
        }

    }
    static async updatePost(req, res){
        try{
            await PostService.updatePost(req.user.userID, req.params.postID, req.body.content);
            return res.status(200).send("Post Updated Successfully");
        }
        catch(err){
            return res.status(400).send(err.message);
        }
    }
    static async getPosts(req, res){
        try {
            const userID = req.user.userID;
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            const offset = (page - 1) * limit;
            const posts = await PostService.getPosts(userID, limit, offset);
            return res.status(200).send(posts);
        }
        catch(err){
            return res.status(400).send(err.message);
        }
    }
}

export default PostController;