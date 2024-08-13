import FriendShipService from "../services/friendShipService.mjs";

class FriendShipController {
    static async addFriend(req, res){
        try{
            const friendShip = {
                userID: req.user.userID,
                friendID: req.params.friendID
            }
            await FriendShipService.addFriend(friendShip);
            return res.status(200).send("Friend Request Sent");
        }
        catch(err){
            return res.status(400).send(err.message);
        }
    }
    static async acceptFriend(req, res){
        try{
            console.log(req.params.friendID, req.user.userID);
            const friendShip = {
                userID: req.params.friendID,
                friendID: req.user.userID
            }
            await FriendShipService.acceptFriend(friendShip);
            return res.status(200).send("Friend Request Accepted");
        }
        catch(err){
            return res.status(400).send(err.message);
        }
    }

    static async removeFriend(req, res){
        try{
            const friendShip = {
                userID: req.user.userID,
                friendID: req.params.friendID
            }
            await FriendShipService.removeFriend(friendShip);
            return res.status(200).send("Friend Removed");
        }
        catch(err){
            return res.status(400).send(err.message);
        }
    }
    static async getFriends(req, res){
        try{
            let friends = await FriendShipService.getFriends(req.user.userID);
            return res.status(200).send(friends);
        }
        catch(err){
            return res.status(400).send(err.message);
        }
    }
    static async getFriendRequests(req, res){
        try{
            let friendRequests = await FriendShipService.getFriendRequests(req.user.userID);
            return res.status(200).send(friendRequests);
        }
        catch(err){
            return res.status(400).send(err.message);
        }
    }
    static async getFriendFriends(req, res){
        try{
            let friends = await FriendShipService.getFriendFriends(req.params.friendID);
            res.status(200).send(friends);
        }
        catch(err){
            res.status(400).send(err.message);
        }
    }
}
export default FriendShipController;