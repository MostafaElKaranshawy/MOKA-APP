import PostLikeDefinition from './definitions/postLikeDefinition.mjs';
import PostDefinition from './definitions/postDefinition.mjs';
import UserDefinition from './definitions/userDefinition.mjs';
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
        post.likes += 1;
        await post.save();
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
            // console.log("LIKE");
            // console.log(like)
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
            console.log("RESULT");
            console.log(result)
            if(!result){
                throw new Error("Like not Exist");
            }
            const post = await PostDefinition.findOne({
                where: {
                    postID: postID
                }
            });
            // console.log("POST");
            // console.log(post);
            post.likes -= 1;
            await post.save();
            // console.log("POST");
            // console.log(post);
            return result;
        }
        catch(err){
            console.log(err)
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
            console.log(likes)
            return likes;
        }
        catch(err){
            throw new Error(err.message);
        }
    }
}