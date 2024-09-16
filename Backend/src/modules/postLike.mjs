import PostLikeDefinition from './definitions/postLikeDefinition.mjs';
import PostDefinition from './definitions/postDefinition.mjs';
import UserDefinition from './definitions/userDefinition.mjs';
import Notification from './notification.mjs'
export default class PostLike {
    static async addPostLike(postID, userID){
        const post = await PostDefinition.findOne({
            where: {
                postID: postID
            }
        });
        const result = await post.createPostLike({
            userID: userID
        });
        if(!result){
            throw new Error("Like already exists");
        }
        post.increment('likes');
        await post.reload();
        if(userID != post.userID)await Notification.addNotification(userID, post.userID, 'like', 'liked your post', postID);
        return result;
    }
    static async removePostLike(userID, postID){
        try {
            const like = await PostLikeDefinition.findOne({
                where: {
                    userID: userID,
                    postID: postID
                }
            });
            if(!like){
                throw new Error("Like not Exist");
            }
            if(userID != like.userID){
                throw new Error("You are not authorized to remove this like");
            }
            const result = await PostLikeDefinition.destroy({
                where: {
                    userID: userID,
                    postID: postID
                }
            });
            if(!result){
                throw new Error("Like not Exist");
            }
            const post = await PostDefinition.findOne({
                where: {
                    postID: postID
                }
            });
            
            post.decrement('likes');
            await post.reload();
            return result;
        }
        catch(err){
            throw new Error(err.message);
        }
    }
    static async getPostLikes(postID){
        try {
            const post = await PostDefinition.findOne({
                where: {
                    postID: postID
                }
            });
            if(!post){
                throw new Error("Post not found");
            }
            const likes = await post.getPostLikes({
                include: {
                    model: UserDefinition,
                    attributes: ['userID', 'name', 'email', 'userName', 'profilePhotoUrl'] // specify the attributes you want to retrieve
                }
            });
            //console.log(likes)
            return likes;
        }
        catch(err){
            throw new Error(err.message);
        }
    }
}