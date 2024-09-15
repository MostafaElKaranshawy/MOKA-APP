import PostDefinition from './definitions/postDefinition.mjs'
import UserDefinition from './definitions/userDefinition.mjs'
import FriendShipDefinition from './definitions/friendShipDefinition.mjs'
import PhotoDefinition from './definitions/photoDefinition.mjs'
import { format } from 'date-fns';
import {Op} from 'sequelize';
export default class Post {
    static async createPost(userID, content, photos){
        const user = await UserDefinition.findOne({
            where: {
                userID: userID,
            }
        });
        const result = await user.createPost({
            content : content
        });
        if(!result){
            throw new Error("Post not added");
        }
        console.log(photos)
        const postID = result.postID;
        if(photos){
            photos.forEach(async (photo) => {
                await PhotoDefinition.create({
                    url: photo.filename,
                    postID: postID
                });
            });
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
    static async updatePost(userID, postID, newContent, removedPhotos){
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
        if(removedPhotos){
            removedPhotos.forEach(async (photoID) => {
                await PhotoDefinition.destroy({
                    where: {
                        id: photoID
                    }
                });
            })
        }
        if(!result){
            throw new Error("Post not updated");
        }
        return result;
    }
    static async getPosts(userID, currentUserID,limit, offset){
        const user = await UserDefinition.findOne({
            where: {
                userID: userID
            }
        });
        let posts = await user.getPosts({
            offset: offset || 0,
            limit: limit || 10
        });
        const currentUser = await UserDefinition.findOne({
            where: {
                userID: currentUserID
            }
        });

        let userLikes = await currentUser.getPostLikes(
            {
                attributes: ['postID']
            }
        );
        let postPhotos = await PhotoDefinition.findAll({
            where: {
                postID: posts.map((post) => post.postID)
            }
        });
        console.log(postPhotos);
        posts = posts.map((post) => {
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
                photos: postPhotos.filter((photo) => photo.postID === post.postID)
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
        let postPhotos = await PhotoDefinition.findAll({
            where: {
                postID: postsFeed.map((post) => post.postID)
            }
        });
        console.log(postPhotos);
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
                photos: postPhotos.filter(photo => photo.postID === post.postID)
            };
        });
        // console.log(formattedPostsFeed);
        return formattedPostsFeed;
    }
}