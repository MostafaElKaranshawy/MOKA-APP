import UserService from '../services/userService.mjs';

export default class UserController{
    static async editUserProfile(req, res){
        const userID = req.user.userID;
        const name = req.body.name;
        const bio = req.body.bio;
        try{
            const newUserInfo = await UserService.editUserProfile(userID, name, bio);
            if(newUserInfo){
                return res.status(200).send(newUserInfo);
            }
            return res.status(404).send("User not found");
        }
        catch(err){
            res.status(404).send(err.message);
        }
    }
    
    static async getUserProfile(req, res){
        const userID = req.user.userID;
        try{
            const user = await UserService.getUserProfile(userID);
            console.log(user)
            res.status(200).send(user);
        }
        catch(err){
            res.status(404).send(err.message);
        }
    }
    
}