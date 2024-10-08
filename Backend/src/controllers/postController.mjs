import PostService from '../services/postService.mjs';
import {eventEmitter} from '../config/wss.mjs';
class PostController{
    static async addPost(req, res){
        try{
            const photos = req.files;
            const userID = req.user.userID;
            const content = req.body.content;
            
            if(userID == null || content == null){
                throw new Error("Invalid Parameters");
            }
            await PostService.createPost(userID, content, photos);
            return res.status(200).send("Post Created Successfully");
        }
        catch(err){
            return res.status(400).send(err.message);
        }
    }
    static async deletePost(req, res){
        try{
            const userID = req.user.userID;
            const postID = parseInt(req.params.postID);
            if(userID == null || postID == null || isNaN(postID)){
                throw new Error("Invalid Parameters");
            }
            await PostService.deletePost(userID, postID);
            // eventEmitter.emit('broadcast', `${req.user.name} deleted a Post`);
            return res.status(200).send("Post Deleted Successfully");
        }
        catch(err){
            return res.status(400).send(err.message);
        }

    }
    static async updatePost(req, res){
        try{
            const userID = req.user.userID;
            const postID = parseInt(req.params.postID);
            const content = req.body.content;
            const removedPhotos = req.body.removedPhotos;
            if(userID == null || postID == null || isNaN(postID) || (content == null && removedPhotos == null)){
                throw new Error("Invalid Parameters");
            }
            await PostService.updatePost(userID, postID, content, removedPhotos);
            // eventEmitter.emit('broadcast', `${req.user.name} updated a Post`);
            return res.status(200).send("Post Updated Successfully");
        }
        catch(err){
            return res.status(400).send(err.message);
        }
    }
    static async getPosts(req, res){
        try {
            const currentUserID = req.user.userID;
            const userID = parseInt(req.params.userID);
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            const offset = (page - 1) * limit;
            if(userID == null || isNaN(page) || isNaN(limit)){
                throw new Error("Invalid Parameters");
            }
            const posts = await PostService.getPosts(userID, currentUserID, limit, offset);
            return res.status(200).send(posts);
        }
        catch(err){
            return res.status(400).send(err.message);
        }
    }
    
    static async getPostsFeed(req, res){
        try {
            const userID = req.user.userID;
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            const offset = (page - 1) * limit;
            if(userID == null || isNaN(page) || isNaN(limit)){
                throw new Error("Invalid Parameters");
            }
            const posts = await PostService.getPostsFeed(userID, limit, offset);
            return res.status(200).send(posts);
        }
        catch(err){
            return res.status(400).send(err.message);
        }
    }
    static async getPost(req, res){
        try {
            const userID = req.user.userID;
            const postID = parseInt(req.params.postID);
            if(postID == null || isNaN(postID)){
                throw new Error("Invalid Parameters");
            }
            const post = await PostService.getPost(postID, userID);
            return res.status(200).send(post);
        }
        catch(err){
            return res.status(400).send(err.message);
        }
    }
}

export default PostController;