import FriendShipDefinition from './definitions/friendShipDefinition.mjs';
import UserDefinition from './definitions/userDefinition.mjs';
import { Op } from '../config/orm.mjs';
export default class FriendShip {
    static async sendFriendRequest(userID, friendID){
        let friendship = await FriendShipDefinition.findOne({
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
            }
        });
        if(friendship == null){
            friendship = await FriendShipDefinition.create({
                user1ID: userID,
                user2ID: friendID,
                senderID: userID,
                status: 0
            });
            if(!friendship){
                throw new Error("Friend Request not sent");
            }
            return;
        }
        console.log(created)
        if(!created){
            if(friendship.status == 1){
                throw new Error("You Are Alraedy Friends");
            }
            else if(friendship.sender == userID){
                throw new Error("Friend Request already sent");
            }
            else if(friendship.sender == friendID){
                throw new Error("Friend Request already received");
            }
            return;
        }
        if(!friendship){
            throw new Error("Friend Request not sent");
        }
        console.log("FRIEND DONEEE")
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
        const friendsIDs = await FriendShipDefinition.findAll({
            where: {
                [Op.or]: [
                    { user1ID: userID },
                    { user2ID: userID },
                ],
                senderID: { [Op.not]: userID },
                status: 0,
            },
            include: [
                {
                    model: UserDefinition,
                    attributes: ['userID', 'name', 'email', 'userName', 'profilePhotoUrl'],
                    as: 'Sender', 
                },
            ],
        });
        console.log(friendsIDs);
        if(friendsIDs == null)
            throw new Error("No friends found");
        const friendRequests = friendsIDs.map((friend) => {
            return {
                userID: friend.user1ID === userID ? friend.user2ID : friend.user1ID,
                name: friend.Sender.name,
                email: friend.Sender.email,
                userName: friend.Sender.userName,
                profilePhotoUrl: friend.Sender.profilePhotoUrl,
                time: friend.createdAt,
            };
        }
        );
        return friendRequests;
    }
    static async getFriends(userName){
        const user = await UserDefinition.findOne({
            where: {
                userName: userName
            }
        });
        if(!user){
            throw new Error("User not found");
        }
        const userID = user.userID;
        const friendsIDs = await FriendShipDefinition.findAll({
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
        if(friendsIDs == null)
            throw new Error("No friends found");
        const friendUserIDs = friendsIDs.map(friendship => 
            friendship.user1ID === userID ? friendship.user2ID : friendship.user1ID
        );
        
        // Step 2: Fetch the User Details
        const friends = await UserDefinition.findAll({
            attributes: ['userID', 'name', 'userName', 'profilePhotoUrl'],
            where: {
                userID: {
                    [Op.in]: friendUserIDs
                }
            }
        });
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
    static async getFriendStatus(userID, friendID){
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
                ]
            }
        });
        let friendStatus;
        if(!friendship){
            // friendStatus = "Not Friends";
            return "Not Friends";
        }
        if(friendship.status == 1){
            friendStatus = "Friends";
            // return "Friends";
        }
        else if(friendship.senderID == userID){
            friendStatus = "Friend Request Sent";
            // return "Friend Request Sent";
        }
        else if(friendship.senderID == friendID){
            friendStatus = "Friend Request Received";
            // return "Friend Request Received";
        }
        console.log(friendStatus);
        return friendStatus;
    }
}