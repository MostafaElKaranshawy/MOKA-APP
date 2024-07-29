import FriendShipService from "../services/friendShipService.mjs";

class FriendShipController {
    static async addFriend(req, res){
        try{
            const friendShip = {
                userID: req.user.userID,
                friendID: req.params.friendID
            }
            await FriendShipService.addFriend(friendShip);
            res.status(200).send("Friend Added");
        }
        catch(err){
            res.status(400).send(err.message);
        }
    }
    static async acceptFriend(req, res){
        try{
            const friendShip = {
                userID: req.user.userID,
                friendID: req.params.friendID
            }
            await FriendShipService.acceptFriend(friendShip);
            res.status(200).send("Friend Accepted");
        }
        catch(err){
            res.status(400).send(err.message);
        }
    }

    static async removeFriend(req, res){
        try{
            const friendShip = {
                userID: req.user.userID,
                friendID: req.params.friendID
            }
            await FriendShipService.removeFriend(friendShip);
            res.status(200).send("Friend Removed");
        }
        catch(err){
            res.status(400).send(err.message);
        }
    }
    static async getFriends(req, res){
        try{
            let friends = await FriendShipService.getFriends(req.user.userID);
            res.status(200).send(friends);
        }
        catch(err){
            res.status(400).send(err.message);
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