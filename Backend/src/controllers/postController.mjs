import Post from '../modules/post.mjs';
import PostService from '../services/postService.mjs';
import User from '../modules/user.mjs';
class PostController{
    static async addPost(req, res){
        try{
            const post = await PostService.createPost(req.user.userID, req.body.content);
            await Post.addPost(post);
            const posts = await Post.getPosts(post.userID);
            return res.status(200).send(posts);
        }
        catch(err){
            return res.status(400).send(err.message);
        }
    }
    static async deletePost(req, res){
        try{
            console.log(req.params.postID);
            console.log(req.user)
            const posts = await PostService.deletePost(req.user.userID, req.params.postID);
            return res.status(200).send(posts);
        }
        catch(err){
            return res.status(400).send(err.message);
        }

    }
    static async updatePost(req, res){
        try{
            const posts = await PostService.updatePost(req.user.userID, req.params.postID, req.body.content);
            return res.status(200).send(posts);
        }
        catch(err){
            return res.status(400).send(err.message);
        }
    }
    static async getPosts(req, res){
        try {
            const userID = await User.getUserID(req.user.userID);
            const posts = await Post.getPosts(userID);
            return res.status(200).send(posts);
        }
        catch(err){
            return res.status(400).send(err.message);
        }
    }
}

export default PostController;