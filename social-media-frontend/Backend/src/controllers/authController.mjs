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
            bio: req.body.bio || ''
        }
        try{
            await AuthService.signUp(user);
            res.status(201).send("User Added Successfully!");
        }
        catch(err){
            res.status(500).send(err.message);
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
}

export default AuthController;