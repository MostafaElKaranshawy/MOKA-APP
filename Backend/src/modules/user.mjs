import UserDefinition from "./definitions/userDefinition.mjs";
import {Op} from "../config/orm.mjs";
import bcrypt from 'bcrypt';
export default class User {
    static async createUser(name, userName, email, password, bio, profilePhotoUrl){
        const user = await UserDefinition.create({
            name : name,
            userName : userName,
            email : email,
            password : password,
            bio : bio,
            profilePhotoUrl : profilePhotoUrl
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
        const newUser =  {
            name : user.name,
            userName : user.userName,
            bio : user.bio,
            email : user.email,
            userID : user.userID,
            profilePhotoUrl: `${user.profilePhotoUrl}`
        }
        //console.log(newUser);
        return newUser;
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
        //console.log(newUserInfo);
        return newUserInfo;
    }
    static async searchUsers(search){
        let users = await UserDefinition.findAll({
            attributes: ['name', 'userName', 'userID', 'profilePhotoUrl'],
            where: {
                name: {[Op.substring]: search}
            }
        });
        users = users.map(user =>user.dataValues);
        //console.log(users);
        return users;
    }
    static async uploadProfilePhoto(userID, profilePhoto) {
        const user = await UserDefinition.findOne({ where: { userID } });
    
        if (!user) {
            throw new Error("User not found");
        }
    
        // user.profilePhotoUrl = `/Backend/uploads/${profilePhoto}`; // Assuming you want to store the file path
        user.profilePhotoUrl = `${profilePhoto}`; // Assuming you want to store the file path
        await user.save();
    
        return user;
    }
    static async editUserSettings(userInfo){
        const user = await UserDefinition.findOne({where: {
            userID: userInfo.userID
        }});
        if(!user)throw new Error("User not found");
        if(userInfo.name)user.name = userInfo.name;
        if(userInfo.email){
            const checkMail = await UserDefinition.findOne({where: {
                email: userInfo.email
            }});
            if(checkMail)throw new Error("Email already exists");
            else{
                user.email = userInfo.email;
            }
        }
        if(userInfo.userName){
            const checkUserName = await UserDefinition.findOne({where: {
                userName: userInfo.userName
            }});
            if(checkUserName)throw new Error("Username already exists");
            else{
                user.userName = userInfo.userName;
            }
        }
        if(userInfo.password){
            const hashedPassword = user.password;
            const match = await bcrypt.compare(userInfo.password, hashedPassword);
            //console.log(match);
            if (!match) {
                throw new Error("Password is Incorrect");
            }
            user.password = await bcrypt.hash(userInfo.newPassword, 10);
        }
        await user.save();
        return user;
    }
}