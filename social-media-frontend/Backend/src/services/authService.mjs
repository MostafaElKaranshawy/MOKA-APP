import User from "../modules/user.mjs";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import SessionService from "./sessionService.mjs";
class AuthService {
    static async signUp(user) {
        try {
            console.log(user);
            const checker = await User.checkEmailAndUserName(user.email, user.userName);               
            if(!checker){
                const created = await User.createUser(user.name, user.userName, user.email, user.password);
                if(!created)throw new Error("User not created");
            }
        }
        catch(err){
            throw new Error(err.message);
        }
    }
    static async signIn(email, password) {
        const user = await User.getUserByEmail(email);
        if(!user)throw new Error("User Not Found");
        const hashedPassword = user.password;
        console.log(user);
        const match = await bcrypt.compare(password, hashedPassword);

        if (!match) {
            throw new Error("Password is Incorrect");
        }
        const userToken = {
            userID: user.userID,
            name: user.name,
            email: user.email,
            userName: user.userName,
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
            user: {
                userID: user.userID,
                name: user.name,
                email: user.email,
                userName: user.userName,
                bio: user.bio
            },
            message: "User Logged In Successfully!"
        };
    }
}

export default AuthService;