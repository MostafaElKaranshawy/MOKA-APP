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
    static async getFriendRequests(userID){
        try {
            const friendRequests = await FriendShip.getFriendRequests(userID);
            return friendRequests;
        }
        catch(err){
            throw new Error(err.message);
        }
    }
    static async getFriends(userID){
        try {
            const friends = await FriendShip.getFriends(userID);
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
}
export default FriendShipService;