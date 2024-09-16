import User from '../modules/user.mjs';
import Notification from '../modules/notification.mjs';
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
    static async uploadProfilePhoto(userID, profilePhoto) {
        try {
            return await User.uploadProfilePhoto(userID, profilePhoto);
        } catch (err) {
            throw new Error(err.message);
        }
    }
    static async editUserSettings(userInfo){
        try{
            return await User.editUserSettings(userInfo);
        }
        catch(err){
            throw new Error(err);
        }
    }
    static async getNotifications(userID){
        try{
            return await Notification.getNotifications(userID);
        }
        catch(err){
            throw new Error(err);
        }
    }
}