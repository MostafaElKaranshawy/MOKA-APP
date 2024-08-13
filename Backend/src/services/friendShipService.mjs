import FriendShip from "../modules/friendShip.mjs";
import User from "../modules/user.mjs";
import {Op} from "../config/orm.mjs";

class FriendShipService {
    static async addFriend(friendShip){
        try {
            const checkFriend = await User.findOne({
                where: {
                    userID: friendShip.friendID
                }
            });
            if(checkFriend == null)throw new Error("Cannot find friend");
            const friendship = await FriendShip.create({
                status: 0
            });
            const user1 = await User.findOne({
                where: {
                    userID: friendShip.userID
                }
            });
            const user2 = await User.findOne({
                where: {
                    userID: friendShip.friendID
                }
            });
            let result = await friendship.setFriend1(user1);
            if(!result){
                throw new Error("Friend not added");
            }
            result = await friendship.setFriend2(user2);
            if(!result){
                throw new Error("Friend not added");
            }
        }
        catch(err){
            throw new Error(err.message);
        }
    }
    static async acceptFriend(friendShip){
        try {
            const checkFriendShip = await FriendShip.findOne({
                where: {
                    userID: friendShip.userID,
                    friendID: friendShip.friendID
                }
            });
            if(checkFriendShip == null)throw new Error("Cannot find friendship");
            checkFriendShip.status = 1;
            const result = await checkFriendShip.save();
            if(!result){
                throw new Error("Friendship not accepted");
            }
        }
        catch(err){
            throw new Error(err.message);
        }
    }
    static async removeFriend(friendShip){
        try {
            const checkFriendShip = await FriendShip.findOne({
                where: {
                    [Op.or]: [{ userID: friendShip.userID, friendID: friendShip.friendID },{ userID: friendShip.friendID, friendID: friendShip.userID }]
                }
            });
            if(checkFriendShip == null)throw new Error("Cannot find friendship");
            const result = await checkFriendShip.destroy();
            if(!result){
                throw new Error("Friendship not deleted");
            }
        }
        catch(err){
            throw new Error(err.message);
        }
    }
    static async getFriends(userID){
        try {
            console.log(userID);

            const friends = await FriendShip.findAll({
                where: {
                    [Op.or]: [{ userID: userID },{ friendID: userID }],
                    status: 1  // Only accepted friendships
                }
            });
            console.log(friends);
            return friends;
        }
        catch(err){
            throw new Error(err.message);
        }
    }
    static async getFriendRequests(userID){
        try {
            const friendRequests = await FriendShip.findAll({
                where: {
                    friendID: userID,
                    status: 0
                }
            });
            return friendRequests;
        }
        catch(err){
            throw new Error(err.message);
        }
    }
    static async getFriendFriends(friendID){
        try {
            const friends = await FriendShip.findAll({
                where: {
                    userID: friendID
                }
            });
            return friends;
        }
        catch(err){
            throw new Error(err.message);
        }
    }
}
export default FriendShipService;