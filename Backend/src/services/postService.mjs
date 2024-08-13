import Post from "../modules/post.mjs";

class PostService {
    static async createPost(userID, content) {
        if(userID == null || content == null){
            throw new Error("Invalid Parameters");
        }
        try {
            const res = await Post.createPost(userID, content);
            if(!res){
                throw new Error("Post not added");
            }
        }
        catch(err){
            throw new Error(err.message);
        }
    }
    static async deletePost(userID, postID) {
        try {
            if(userID == null || postID == null){
                throw new Error("invalid Parameters");
            }
            const res = await Post.deletePost(userID, postID);
            if(!res){
                throw new Error("Post not deleted");
            }
        }
        catch(err){
            throw new Error(err.message);
        }
    }
    static async updatePost(userID, postID, newContent){
        if(userID == null || postID == null || newContent == null){
            throw new Error("Invalid Parameters");
        }
        try {
            
        }
        catch(err){
            throw new Error(err.message);
        }
    }
    static async getPosts(userID, limit, offset) {
        if(userID == null || limit == null || offset == null){
            throw new Error("Invalid Parameters");
        }
        try {
            const posts = await Post.getPosts(userID, limit, offset);
            return posts;
        }
        catch(err){
            throw new Error(err.message);
        }
    }
}

export default PostService;