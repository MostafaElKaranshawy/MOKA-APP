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
    static async getUserProfile(userName){
        try{
            return await User.getUserProfile(userName);
        }
        catch(err){
            throw new Error(err);
        }
    }
    static async searchUsers(search){
        try{
            return await User.searchUsers(search);
        }
        catch(err){
            throw new Error(err);
        }
    }
}