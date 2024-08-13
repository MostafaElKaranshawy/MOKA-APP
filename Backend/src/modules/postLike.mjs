import PostLikeDefinition from './definitions/postLikeDefinition.mjs';
import PostDefinition from './definitions/postDefinition.mjs';

export default class PostLike {
    static async addPostLike(postID, userID){
        const post = await PostDefinition.findOne({
            where: {
                postID: postID
            }
        });
        // result is 0 if exist, 1 if not exist
        const result = await post.createPostLike({
            userID: userID
        });
        if(!result){
            throw new Error("Like already exists");
        }
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
        }
        catch(err){
            throw new Error(err.message);
        }
    }
    static async getPostLikes(postID, offset, limit){
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
                limit: limit,
                offset : offset
            });
            return likes;
        }
        catch(err){
            throw new Error(err.message);
        }
    }
}