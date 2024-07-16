import DataBase from "../modules/dataBase.mjs";
import bcrypt from 'bcrypt';

const db = new DataBase();
db.connectDataBase();

class AuthService {
    static async signUp(userName, email) {
        const q = `SELECT * FROM users WHERE userName = ? OR email = ?`;
        const result = await db.executeQuery(q, [userName, email]);

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
        const q = `SELECT * FROM users WHERE email = ?`;
        const result = await db.executeQuery(q, [email]);

        if (result.length === 0) {
            throw new Error("User Not Found");
        }

        const hashedPassword = result[0].password;
        const match = await bcrypt.compare(password, hashedPassword);

        if (!match) {
            throw new Error("Password is Incorrect");
        }
        return result[0];
    }
}

export default AuthService;