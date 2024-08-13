import User from "../modules/user.mjs";
import Post from "../modules/post.mjs";

class PostService {
    static async createPost(userID, content) {
        if(userID != null) {
            const post = {
                userID : userID,
                content : content
            }
            try {
                const user = await User.findOne({
                    where: {
                        userID: post.userID
                    }
                });
                const result = await user.createPost({
                    content : post.content
                });
                if(!result){
                    throw new Error("Post not added");
                }
            }
            catch(err){
                throw new Error(err.message);
            }
        }
        else {
            throw new Error("User Not Found");
        }
    }
    static async deletePost(userID, postID) {
        try {
            const post = await Post.findOne({
                where: {
                    postID: postID
                }
            });
            if(post.userID != userID){
                // console.log("post not deleted as user not the author")
                throw new Error("Only the owner of the post can delete it");
            }
            else{
                const result = await Post.destroy({
                    where: {
                        postID: postID
                    }
                });
                if(!result){
                    throw new Error("Post not deleted");
                }
            }
        }
        catch(err){
            throw new Error(err.message);
        }
    }
    static async updatePost(userID, postID, newContent){
        try {
            const post = await Post.findOne({
                where: {
                    postID: postID
                }
            });
            if(post.userID != userID){
                throw new Error("Only the owner of the post can update it");
            }
            else{
                const result = await Post.update({
                    content: newContent
                },
                {
                    where: {
                        postID: postID
                    }
                });
                if(!result){
                    throw new Error("Post not updated");
                }
            }
        }
        catch(err){
            throw new Error(err.message);
        }
    }
    static async getPosts(userID, limit, offset) {
        try {
            const user = await User.findOne({
                where: {
                    userID: userID
                }
            });
            const posts = await user.getPosts({
                offset: offset || 0,
                limit: limit || 10
            });
            console.log(posts);
            return posts;
        }
        catch(err){
            throw new Error(err.message);
        }
    }
}

export default PostService;