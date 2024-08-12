import User from "../modules/user.mjs";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import SessionService from "./sessionService.mjs";
class AuthService {
    static async signUp(user) {
        try {
            const checkEmail = await User.findOne({where: {
                email: user.email
            }});
            if(checkEmail != null)throw new Error("Email already exists");

            const checkUserName = await User.findOne({where: {
                userName: user.userName
            }});
            if(checkUserName != null)throw new Error("Username already exists");

            const res = await User.create({
                name : user.name,
                userName : user.userName,
                email : user.email,
                password : user.password
            });
            if(!res)throw new Error("User not created");
        }
        catch(err){
            console.log(err)
            throw new Error(err.message);
        }
    }
    static async signIn(email, password) {
        const user = await User.findOne({where: {
            email: email
        }});
        if(user == null)throw new Error("User Not Found");
        const hashedPassword = user.password;
        const match = await bcrypt.compare(password, hashedPassword);

        if (!match) {
            throw new Error("Password is Incorrect");
        }
        const userToken = {
            userID: user.userID
        };
        const accessToken = jwt.sign(userToken, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '3d' });
        try {
            await SessionService.createSession(user.userID, accessToken);
        }
        catch (err){
            throw new Error(err.message);
        }
        return {
            accessToken: accessToken,
            user: user,
            message: "User Logged In Successfully!"
        };
    }
}

export default AuthService;