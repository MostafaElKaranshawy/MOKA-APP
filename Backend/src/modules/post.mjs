import PostDefinition from './definitions/postDefinition.mjs'
import UserDefinition from './definitions/userDefinition.mjs'

export default class Post {
    static async createPost(userID, content){
        const user = await UserDefinition.findOne({
            where: {
                userID: userID
            }
        });
        console.log("hello")
        console.log(userID);
        console.log(user)
        const result = await user.createPost({
            content : content
        });
        if(!result){
            throw new Error("Post not added");
        }
        return result;
    }
    static async deletePost(userID, postID){
        const post = await PostDefinition.findOne({
            where: {
                postID: postID
            }
        });
        if(!post){
            throw new Error("Post not found");
        }
        if(post.userID != userID){
            throw new Error("Only the owner of the post can delete it");
        }
        const result = await PostDefinition.destroy({
            where: {
                postID: postID
            }
        });
        if(!result){
            throw new Error("Post not deleted");
        }
        return result;
    }
    static async updatePost(userID, postID, newContent){
        const post = await PostDefinition.findOne({
            where: {
                postID: postID
            }
        });
        if(!post){
            throw new Error("Post not found");
        }
        if(post.userID != userID){
            throw new Error("Only the owner of the post can update it");
        }
        const result = await PostDefinition.update({
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
        return result;
    }
    static async getPosts(userID, limit, offset){
        const user = await UserDefinition.findOne({
            where: {
                userID: userID
            }
        });
        const posts = await user.getPosts({
            offset: offset || 0,
            limit: limit || 10
        });
        return posts;
    }
}