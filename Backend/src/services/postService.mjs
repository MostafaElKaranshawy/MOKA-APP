import User from "../modules/user.mjs";
import Post from "../modules/post.mjs";
import Comment from "../modules/comment.mjs";
import Like from "../modules/like.mjs";
class PostService {
    static async createPost(userName, content) {
        const userID = await User.getUserID(userName);
        if(userID != null) {
            const post = {
                userID : userID,
                content : content
            }
            return post;
        }
        else {
            throw new Error("User Not Found");
        }
    }
    static async deletePost(userName, postID) {
        const userID = await User.getUserID(userName);
        if(userID != null) {
            await Like.deletePostLikes(postID);
            await Comment.deletePostComments(postID);
            await Post.deletePost(postID);
            const posts = await Post.getPosts(userID);
            if(posts != null) return posts;
            else throw new Error("User Not Found");
        }
        else {
            throw new Error("User Not Found");
        }
    }
    static async updatePost(userName, postID, newContent){
        const userID = await User.getUserID(userName);
        if(userID != null) {
            
            await Post.updatePost(postID, newContent);
            const posts = await Post.getPosts(userID);
            if(posts != null) return posts;
            else throw new Error("User Not Found");
        }
        else {
            throw new Error("User Not Found");
        }
    }
}

export default PostService;