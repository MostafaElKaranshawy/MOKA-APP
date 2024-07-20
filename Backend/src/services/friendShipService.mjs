import FriendShip from "../modules/friendShip.mjs";

class FriendShipService {
    static async addFriend(friendShip){
        try{
            await FriendShip.addFriend(friendShip);
        }
        catch(err){
            throw new Error(err.message);
        }
    }
    static async acceptFriend(friendShip){
        try{
            await FriendShip.acceptFriend(friendShip);
        }
        catch(err){
            throw new Error(err.message);
        }
    }
    static async removeFriend(friendShip){
        try{
            await FriendShip.removeFriend(friendShip);
        }
        catch(err){
            throw new Error(err.message);
        }
    }
    static async getFriends(userID){
        try{
            return await FriendShip.getFriends(userID);
        }
        catch(err){
            throw new Error(err.message);
        }
    }
    static async getFriendFriends(friendID){
        try{
            return await FriendShip.getFriendFriends(friendID);
        }
        catch(err){
            throw new Error(err.message);
        }
    }
}
export default FriendShipService;