import User from "../modules/user.mjs";
import Post from "../modules/post.mjs";

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
}

export default PostService;