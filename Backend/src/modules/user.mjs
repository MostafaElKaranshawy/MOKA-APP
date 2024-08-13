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
    static async getUserByEmail(email){
        const user = await UserDefinition.findOne({where: {
            email: email
        }});
        console.log(user);
        console.log("#################");
        return user;
    }
    
}