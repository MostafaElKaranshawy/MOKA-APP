import UserDefinition from "./definitions/userDefinition.mjs";
import {Op} from "../config/orm.mjs";
export default class User {
    static async createUser(name, userName, email, password){
        const user = await UserDefinition.create({
            name : name,
            userName : userName,
            email : email,
            password : password
        });
        return user != null;
    }
    static async checkEmailAndUserName(email, userName){
        const user = await UserDefinition.findOne({where: {
            [Op.or]: [{email: email}, {userName: userName}]
        }});
        if(user == null)return false;
        if(email === user.email) throw new Error("Email already exists");
        if(userName === user.userName) throw new Error("Username already exists");
        return false;   // not email ot username found.
    }
    static async getUserByEmail(email) {
        const user = await UserDefinition.findOne(
            {
                where : {
                    email : email
                }
            }
        )
        return user;
    }
    static async getUserProfile(userName){
        const user = await UserDefinition.findOne({
            attributes: ['name', 'userName', 'bio', 'email', 'userID', 'profilePhotoUrl'],
            where: {
                userName: userName
            }
        });
        console.log(user);
        return user;
    }
    static async editUserProfile(userID, name, bio){
        const user = await UserDefinition.findOne({where: {
            userID: userID
        }}) 
        if(!name)name = user.name;
        if(!bio)bio = user.bio;
        const newUserInfo = await user.update({name: name, bio: bio}, {where: {
            userID: userID
        }});
        console.log(newUserInfo);
        return newUserInfo;
    }
    static async searchUsers(search){
        let users = await UserDefinition.findAll({
            attributes: ['name', 'userName', 'userID'],
            where: {
                name: {[Op.substring]: search}
            }
        });
        users = users.map(user =>user.dataValues);
        console.log(users);
        return users;
    }
    static async uploadProfilePhoto(userID, profilePhoto) {
        const user = await UserDefinition.findOne({ where: { userID } });
    
        if (!user) {
            throw new Error("User not found");
        }
    
        user.profilePhotoUrl = `/Backend/uploads/${profilePhoto}`; // Assuming you want to store the file path
        await user.save();
    
        return user;
    }
}