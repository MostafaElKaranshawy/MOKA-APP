import FriendShipDefinition from './definitions/friendShipDefinition.mjs';
import UserDefinition from './definitions/userDefinition.mjs';
import { Op } from '../config/orm.mjs';
export default class FriendShip {
    static async sendFriendRequest(userID, friendID){
        const user = await UserDefinition.findOne({
            where: {
                userID: userID
            }
        });
        const friend = await UserDefinition.findOne({
            where: {
                userID: friendID
            }
        });
        if(!user || !friend){
            throw new Error("User not found");
        }
        const [friendship, created] = await FriendShipDefinition.findOrCreate({
            where: {
                [Op.or]: [
                    {
                        user1ID: userID,
                        user2ID: friendID
                    },
                    {
                        user1ID: friendID,
                        user2ID: userID
                    }
                ],
                status: 0
            }
        });
        if(!created){
            if(friendship.sender == userID){
                throw new Error("Friend Request already sent");
            }
            if(friendship.sender == friendID){
                throw new Error("Friend Request already received");
            }

        }
        if(!friendship){
            throw new Error("Friend Request not sent");
        }
        friendship.setFriend1(user);
        friendship.setFriend2(friend);
        friendship.setSender(userID);
        await friendship.save();
    }
    static async acceptFriendRequest(userID, friendID){
        const user = await UserDefinition.findOne({
            where: {
                userID: userID
            }
        });
        if(!user){
            throw new Error("User not found");
        }
        const friendship = await FriendShipDefinition.findOne({
            where: {
                senderID : friendID,
                [Op.or]: [
                    {
                        user1ID: userID,
                        user2ID: friendID
                    },
                    {
                        user1ID: friendID,
                        user2ID: userID
                    }
                ]
            }
        });
        if(!friendship){
            throw new Error("Friend Request not found");
        }
        if(friendship.status == 1){
            throw new Error("Friend Request already accepted");
        }
        friendship.status = 1;
        const res = await friendship.save();
        if(!res){
            throw new Error("Friend Request not accepted");
        }
    }
    static async removeFriendRequest(userID, friendID){
        const user = await UserDefinition.findOne({
            where: {
                userID: userID
            }
        });
        if(!user){
            throw new Error("User not found");
        }
        const friendship = await FriendShipDefinition.findOne({
            where: {
                senderID : userID,
                [Op.or]: [
                    {
                        user1ID: userID,
                        user2ID: friendID
                    },
                    {
                        user1ID: friendID,
                        user2ID: userID
                    }
                ],
                status: 0,
            }
        });
        if(!friendship){
            throw new Error("Friend Request not found");
        }
        const res = await friendship.destroy();
        if(!res){
            throw new Error("Friend Request not removed");
        }
    }
    static async getFriendRequests(userID){
        const friendRequests = await FriendShipDefinition.findAll({
            where: {
                [Op.not]: {
                    senderID: userID
                },
                status: 0
            }
        });
        if(friendRequests == null)
            throw new Error("No friend requests found");
        return friendRequests;
    }
    static async getFriends(userID){
        const friends = await FriendShipDefinition.findAll({
            where: {
                [Op.or]: [
                    {
                        user1ID: userID,
                    },
                    {
                        user2ID: userID,
                    }
                ],
                status: 1
            }
        });
        if(friends == null)
            throw new Error("No friends found");
        return friends;
    }
    static async removeFriend(userID, friendID){
        const friendship = await FriendShipDefinition.findOne({
            where: {
                [Op.or]: [
                    {
                        user1ID: userID,
                        user2ID: friendID
                    },
                    {
                        user1ID: friendID,
                        user2ID: userID
                    }
                ],
                status: 1
            }
        });
        if(!friendship){
            throw new Error("Friend not found");
        }
        const res = await friendship.destroy();
        if(!res){
            throw new Error("Friend not removed");
        }
    }
}