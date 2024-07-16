import AuthService from "../services/authService.mjs";
import User from "../modules/user.mjs";
import bcrypt, { hash } from 'bcrypt';
const saltRounds = 10;

class AuthController {
    static async signUp(req, res) {
        const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
        const user = {
            name: req.body.name,
            userName: req.body.userName,
            email: req.body.email,
            password: hashedPassword,
            bio: req.body.bio || ''
        }
        // console.log(user);
        try{
            await AuthService.signUp(user.userName, user.email);
            await User.addUser(user);
            res.status(201).send("User Added Successfully!");
        }
        catch(err){
            res.status(500).send(err.message);
        }
    }
    static async signIn(req, res) {
        const user = {
            email: req.body.email,
            password: req.body.password
        }
        try{
            const result = await AuthService.signIn(user.email, user.password);
            res.status(200).send(result);
        }
        catch(err){
            res.status(500).send(err.message);
        }
    }
}

export default AuthController;