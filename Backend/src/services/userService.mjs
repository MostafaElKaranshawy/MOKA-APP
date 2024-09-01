import User from '../modules/user.mjs';

export default class UserService{
    static async editUserProfile(userID, name, bio){
        try{
            const newUserInfo = await User.editUserProfile(userID, name, bio);
            return newUserInfo;
        }
        catch(err){
            throw new Error(err);
        }
    }
    static async getUserProfile(userID){
        try{
            return await User.getUserProfile(userID);
        }
        catch(err){
            throw new Error(err);
        }
    }
}