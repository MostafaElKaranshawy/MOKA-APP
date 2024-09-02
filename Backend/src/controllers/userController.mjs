import UserService from '../services/userService.mjs';
import {eventEmitter} from '../config/wss.mjs';
export default class UserController{
    static async editUserProfile(req, res){
        const userID = req.user.userID;
        const name = req.body.name;
        const bio = req.body.bio;
        try{
            const newUserInfo = await UserService.editUserProfile(userID, name, bio);
            if(newUserInfo){
                eventEmitter.emit('broadcast', `${req.user.name} updated their Profile`);
                return res.status(200).send(newUserInfo);
            }
            return res.status(404).send("User not found");
        }
        catch(err){
            res.status(404).send(err.message);
        }
    }
    static async getUserProfile(req, res){
        const userName = req.params.userName;
        console.log(userName)
        try{
            const user = await UserService.getUserProfile(userName);
            console.log(user)
            res.status(200).send(user);
        }
        catch(err){
            res.status(404).send(err.message);
        }
    }
    static async searchUsers(req, res){
        const search = req.query.search;
        console.log(search);
        try{
            const users = await UserService.searchUsers(search);
            res.status(200).send(users);
        }
        catch(err){
            res.status(404).send(err.message);
        }
    }
}