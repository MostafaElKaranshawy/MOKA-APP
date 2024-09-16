import notificationDefinition from "./definitions/notificationDefinition.mjs";
import {eventEmitter} from '../config/wss.mjs';
import FriendShipDefinition from "./definitions/friendShipDefinition.mjs";
import UserDefinition from "./definitions/userDefinition.mjs";
import {Op} from 'sequelize';
export default class Notification {
    static async addFriendRequestNotification(fromID, toID, content ,friendRequestID){
        const result = await notificationDefinition.create({
            fromID: fromID,
            toID: toID,
            type: 'friendRequest',
            content: content,
            seen: false,
            friendRequestID: friendRequestID
        });
        if(!result){
            throw new Error("Notification not added");
        }
        eventEmitter.emit('broadcast', content, toID);
    }
    static async addNotification(fromID, toID, notificationType, content, postID){
        const result = await notificationDefinition.create({
            fromID: fromID,
            toID: toID,
            type: notificationType,
            content: content,
            seen: false,
            postID: postID
        });
        if(!result){
            throw new Error("Notification not added");
        }
        eventEmitter.emit('broadcast', content, userID);
    }
    static async addFriendsNotification(userID, notificationType, content, postID){
        try {
            console.log("updating1");
    
            const friendsIDs = await FriendShipDefinition.findAll({
                where: {
                    [Op.or]: [
                        { user1ID: userID },
                        { user2ID: userID }
                    ],
                    status: 1
                }
            });
    
            console.log("updating2");
    
            if (friendsIDs.length === 0) {
                console.log("No friends found");
                return;
            }
    
            const friends = friendsIDs.map(friendship =>
                friendship.user1ID === userID ? friendship.user2ID : friendship.user1ID
            );
    
            console.log("updating3");
            console.log(friends);
    
            friends.forEach(async (friend) => {
                const result = await notificationDefinition.create({
                    fromID: userID,
                    toID: friend,
                    type: notificationType,
                    content: content,
                    seen: false,
                    postID: postID
                });
    
                if (!result) {
                    throw new Error("Notification not added");
                }
    
                eventEmitter.emit('broadcast', content, friend);
            });
        } catch (error) {
            console.error("Error in addFriendsNotification:", error);
        }
    }
    static async seeNotification(notificationID){
        const notification = await notificationDefinition.findOne({
            where: {
                notificationID: notificationID
            }
        });
        if(!notification){
            throw new Error("Notification not found");
        }
        notification.seen = true;
        const result = await notification.save();
        if(!result){
            throw new Error("Notification not updated");
        }
    }
    static async getNotifications(userID){
        const notifications = await notificationDefinition.findAll({
            where: {
                toID: userID
            },
            include: [
                {
                    model: UserDefinition, // Assuming you have a User model associated with the Post model
                    as : 'userfrom',
                    attributes: ['name', 'userName', 'userID', 'profilePhotoUrl'], // Replace 'name' with the actual field for the user's name
                },
            ],
            sort: [['createdAt', 'DESC']]
        });
        const notificationData = notifications.map((notification) => {
            return {
                notificationID: notification.id,
                from: {
                    userID: notification.userfrom.userID,
                    name: notification.userfrom.name,
                    userName: notification.userfrom.userName,
                    profilePhotoUrl: notification.userfrom.profilePhotoUrl
                },
                type: notification.type,
                content: notification.content,
                seen: notification.seen,
                postID: notification.postID,
                friendRequestID: notification.friendRequestID,
                time: notification.createdAt
            }
        });
        return notificationData;
    }
}