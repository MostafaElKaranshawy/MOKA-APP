import AuthService from "../services/authService.mjs";
import bcrypt from 'bcrypt';
const saltRounds = 10;

class AuthController {

    static async signUp(req, res){
        console.log(req.body);
        const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
        const user = {
            name: req.body.name,
            userName: req.body.userName,
            email: req.body.email,
            password: hashedPassword,
            bio: req.body.bio || "",
            // profilePhotoUrl: "/Backend/uploads/profile-photo-holder.jpg"
            profilePhotoUrl: "profile-photo-holder.jpg"
        }
        try{
            await AuthService.signUp(user);
            res.status(201).send("User Signed Up Successfully!");
        }
        catch(err){
            console.log(err.message);
            res.status(400).send(err.message);
        }
    }
    static async signIn(req, res) {
        console.log(req.body);
        let result = null
        console.log(req.body);
        try{
            result = await AuthService.signIn(req.body.email, req.body.password);
            console.log(result);
        }
        catch(err){
            return res.status(500).send(err.message);
        }
        return res.status(200).send(result);
    }
    static async signOut(req, res) {
        try{
            const userID = req.user.userID;
            const token = req.header('Authorization').replace('Bearer ', '');
            console.log(userID, token);
            await AuthService.signOut(userID, token);
            res.status(200).send("Logged out");
        }
        catch(err){
            res.status(500).send(err.message);
        }
    }
}

export default AuthController;