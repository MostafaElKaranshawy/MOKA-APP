import Post from '../modules/post.mjs';
import PostService from '../services/postService.mjs';

class PostController{
    static async addPost(req, res){
        try{
            const post = await PostService.createPost(req.body.userName, req.body.content);
            await Post.addPost(post);
            const posts = await Post.getPosts(post.userID);
            console.log(posts);
            return res.status(200).send(posts);
        }
        catch(err){
            return res.status(400).send("User Not Found");
        }
    }
    static async getPost(req, res){
        // Get post logic here
    }
    static async deletePost(req, res){
        // Delete post logic here
    }
    static async updatePost(req, res){
        // Update post logic here
    }
    static async getPosts(req, res){
        
    }
}

export default PostController;