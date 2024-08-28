import PostDefinition from './definitions/postDefinition.mjs'
import UserDefinition from './definitions/userDefinition.mjs'
import { format } from 'date-fns';
export default class Post {
    static async createPost(userID, content){
        const user = await UserDefinition.findOne({
            where: {
                userID: userID,
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
        let posts = await user.getPosts({
            offset: offset || 0,
            limit: limit || 10
        });
        let userLikes = await user.getPostLikes(
            {
                attributes: ['postID']
            }
        );
        posts = posts.map((post) => {
            return {
                postID: post.postID,
                authorName: user.name,
                content: post.content,
                time : format(new Date(post.createdAt), 'dd-mm-yyyy HH:mm:ss'),
                userID: post.userID,
                liked: userLikes.find((like) => like.postID === post.postID) ? true : false,
                likes: post.likes,
                comments: post.comments,
            };
        });
        return posts;        
    }
}