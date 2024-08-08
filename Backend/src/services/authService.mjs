import DataBase from "../modules/dataBase.mjs";
import bcrypt from 'bcrypt';
import Session from "../modules/session.mjs";
import jwt from 'jsonwebtoken';

const db = new DataBase();
db.connect();

class AuthService {
    static async signUp(userName, email) {
        const q = `SELECT * FROM users WHERE userName = ? OR email = ?`;
        const result = await db.orm.query(q, [userName, email]);

        if (result.length !== 0) {
            if (result[0].userName === userName) {
                throw new Error("Username Already Exists Try Another");
            } else if (result[0].email === email) {
                throw new Error("Email Already Exists Try Another");
            }
            throw new Error("UserName or Email Already Exists");
        }
    }
    static async signIn(email, password) {
        const user = await db.User.findOne({where: {
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
        console.log(user);
        console.log('userToken');
        console.log(userToken);
        const accessToken = jwt.sign(userToken, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '3d' });
        console.log(accessToken);
        try {
            await Session.createSession(user.userID, accessToken);
        }
        catch (err){
            throw new Error(err.message);
        }
        return {
            accessToken: accessToken,
            user: user,
            msg: "User Logged In Successfully!"
        };
    }
}

export default AuthService;