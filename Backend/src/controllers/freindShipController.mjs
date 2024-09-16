import FriendShipService from "../services/friendShipService.mjs";
import {eventEmitter} from '../config/wss.mjs';
class FriendShipController {
    static async sendFriendRequest(req, res){
        //console.log("sendFriendRequest")
        const friendID = parseInt(req.params.friendID);
        const userID = req.user.userID;
        //console.log(friendID);
        if(isNaN(friendID) || !friendID || !userID){
            return res.status(400).send("Invalid friendID");
        }
        if(friendID == userID){
            return res.status(400).send("Cannot send friend request to yourself");
        }
        try{
            await FriendShipService.sendFriendRequest(userID, friendID);
            return res.status(200).send("Friend Request Sent");
        }
        catch(err){
            return res.status(400).send(err.message);
        }
    }
    static async acceptFriendRequest(req, res){
        const friendID = parseInt(req.params.friendID);
        const userID = req.user.userID;
        if(isNaN(friendID)){
            return res.status(400).send("Invalid friendID");
        }
        if(friendID == userID){
            return res.status(400).send("Cannot accept friend request from yourself");
        }
        try{
            await FriendShipService.acceptFriendRequest(userID, friendID);
            // eventEmitter.emit('broadcast', `${req.user.name} accepted a Friend Request`);
            return res.status(200).send("Friend Request Accepted");
        }
        catch(err){
            return res.status(400).send(err.message);
        }
    }
    static async removeFriendRequest(req, res){
        const friendID = parseInt(req.params.friendID);
        const userID = req.user.userID;
        if(isNaN(friendID)){
            return res.status(400).send("Invalid friendID");
        }
        if(friendID == userID){
            return res.status(400).send("Cannot remove yourself from friend list");
        }
        try{
            await FriendShipService.removeFriendRequest(userID, friendID);
            // eventEmitter.emit('broadcast', `${req.user.name} removed a Friend Request`);
            return res.status(200).send("Friend Removed");
        }
        catch(err){
            return res.status(400).send(err.message);
        }
    }
    static async getFriendRequests(req, res){
        const userID = req.user.userID;
        try{
            const friendRequests = await FriendShipService.getFriendRequests(userID);
            return res.status(200).send(friendRequests);
        }
        catch(err){
            return res.status(400).send(err.message);
        }
    }
    static async getFriends(req, res){
        // const userID = req.user.userID;
        const userName = req.params.userName;
        try{
            const friends = await FriendShipService.getFriends(userName);
            return res.status(200).send(friends);
        }
        catch(err){
            return res.status(400).send(err.message);
        }
    }
    static async removeFriend(req, res){
        const friendID = parseInt(req.params.friendID);
        const userID = req.user.userID;
        if(isNaN(friendID) || friendID == null){
            return res.status(400).send("Invalid friendID");
        }
        if(friendID == userID){
            return res.status(400).send("Cannot remove yourself from friend list");
        }
        try{
            await FriendShipService.removeFriend(userID, friendID);
            // eventEmitter.emit('broadcast', `${req.user.name} removed a Friend`);
            return res.status(200).send("Friend Removed");
        }
        catch(err){
            return res.status(400).send(err.message);
        }
    }
    static async getFriendStatus(req, res){
        const friendID = parseInt(req.params.friendID);
        const userID = req.user.userID;
        if(isNaN(friendID) || friendID == null){
            return res.status(400).send("Invalid friendID");
        }
        if(friendID == userID){
            return res.status(400).send("Cannot check status with yourself");
        }
        try{
            const status = await FriendShipService.getFriendStatus(userID, friendID);
            return res.status(200).send(status);
        }
        catch(err){
            return res.status(400).send(err.message);
        }
    }
}
export default FriendShipController;