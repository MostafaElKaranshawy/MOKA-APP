import Post from "../modules/post.mjs";
import Comment from "../modules/comment.mjs";
import Like from "../modules/like.mjs";
class PostService {
    static async createPost(userID, content) {
        if(userID != null) {
            const post = {
                userID : userID,
                content : content
            }
            Post.addPost(post);
        }
        else {
            throw new Error("User Not Found");
        }
    }
    static async deletePost(userID, postID) {
        if(userID != null) {
            try{
                await Post.deletePost(postID);
            }
            catch(err){
                throw new Error(err.msg);
            }
        }
        else {
            throw new Error("User Not Found");
        }
    }
    static async updatePost(userID, postID, newContent){
        if(userID != null) {
            try{
                await Post.updatePost(postID, newContent);
            }
            catch(err){
                throw new Error(err.msg);
            }
        }
        else {
            throw new Error("User Not Found");
        }
    }
    static async getPosts(userID, limit, offset) {
        if(userID != null) {
            return await Post.getPosts(userID, limit, offset);
        }   
        else{
            throw new Error("User Not Found");
        }
    }
}

export default PostService;