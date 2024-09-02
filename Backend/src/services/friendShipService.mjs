import FriendShip from "../modules/friendShip.mjs";

class FriendShipService {
    static async sendFriendRequest(userID, friendID){
        try {
            await FriendShip.sendFriendRequest(userID, friendID);
        }
        catch(err){
            throw new Error(err.message);
        }
    }
    static async acceptFriendRequest(userID, friendID){
        try {
            await FriendShip.acceptFriendRequest(userID, friendID);
        }
        catch(err){
            throw new Error(err.message);
        }
    }
    static async removeFriendRequest(userID, friendID){
        try {
            await FriendShip.removeFriendRequest(userID, friendID);
        }
        catch(err){
            throw new Error(err.message);
        }
    }
    static async getFriendRequests(userID){
        try {
            const friendRequests = await FriendShip.getFriendRequests(userID);
            return friendRequests;
        }
        catch(err){
            throw new Error(err.message);
        }
    }
    static async getFriends(UserName){
        try {
            const friends = await FriendShip.getFriends(UserName);
            return friends;
        }
        catch(err){
            throw new Error(err.message);
        }
    }
    static async removeFriend(userID, friendID){
        try {
            await FriendShip.removeFriend(userID, friendID);
        }
        catch(err){
            throw new Error(err.message);
        }
    }
    static async getFriendStatus(userID, friendID){
        try {
            const status = await FriendShip.getFriendStatus(userID, friendID);
            return status;
        }
        catch(err){
            throw new Error(err.message);
        }
    }
}
export default FriendShipService;