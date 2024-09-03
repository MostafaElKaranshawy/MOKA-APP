import PostDefinition from './definitions/postDefinition.mjs'
import UserDefinition from './definitions/userDefinition.mjs'
import FriendShipDefinition from './definitions/friendShipDefinition.mjs'
import { format } from 'date-fns';
import {Op} from 'sequelize';
export default class Post {
    static async createPost(userID, content){
        const user = await UserDefinition.findOne({
            where: {
                userID: userID,
            }
        });
        // console.log("hello")
        // console.log(userID);
        // console.log(user)
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
            // console.log(post);
            return {
                postID: post.postID,
                authorName: user.name,
                userName : user.userName,
                content: post.content,
                time : new Date(post.createdAt),
                profilePhotoUrl : user.profilePhotoUrl,
                userID: post.userID,
                liked: userLikes.find((like) => like.postID === post.postID) ? true : false,
                likes: post.likes,
                comments: post.comments,
            };
        });
        return posts;        
    }
    static async getPostsFeed(userID, limit, offset){
        const user = await UserDefinition.findOne({
            where: {
                userID: userID
            }
        });
        let userLikes = await user.getPostLikes(
            {
                attributes: ['postID']
            }
        );
        const friends = await FriendShipDefinition.findAll({
            where: {
                [Op.or]: [
                    { user1ID: userID },
                    { user2ID: userID },
                ],
                status: 1
            },
            attributes: ['user1ID', 'user2ID'],
        });
        
        const friendIds = friends.map(friend => 
            friend.user1ID === userID ? friend.user2ID : friend.user1ID
        );
        
        // Step 2: Fetch posts by the user and their friends, including the author's name
        const postsFeed = await PostDefinition.findAll({
            where: {
            userId: {
                [Op.in]: [userID, ...friendIds],
            },
            },
            include: [
            {
                model: UserDefinition, // Assuming you have a User model associated with the Post model
                attributes: ['name', 'userName', 'userID', 'profilePhotoUrl'], // Replace 'name' with the actual field for the user's name
            },
            ],
            limit: limit,
            offset: offset,
            order: [['createdAt', 'DESC']], // Sort posts by most recent
        });
        // console.log(postsFeed[0].user);
        // Assuming you have a userLikes array that contains the likes
        const formattedPostsFeed = postsFeed.map(post => {
            return {
            postID: post.postID,
            authorName: post.user.dataValues.name, // Using the name from the joined User model
            content: post.content,
            time: new Date(post.createdAt),
            userName : post.user.dataValues.userName,
            profilePhotoUrl : post.user.dataValues.profilePhotoUrl,
            userID: post.userID, // Assuming this is the correct field name for the user ID
            liked: userLikes.find(like => like.postID === post.postID) ? true : false,
            likes: post.likes,
            comments: post.comments,
            };
        });
        // console.log(formattedPostsFeed);
        return formattedPostsFeed;
    }
}