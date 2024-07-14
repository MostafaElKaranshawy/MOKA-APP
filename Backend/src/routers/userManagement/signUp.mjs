import DataBase from "../../modules/dataBase.mjs";
import Router from "router";
import bcrypt from 'bcrypt';
import { body, validationResult } from 'express-validator';

let db = new DataBase();
db.connectDataBase();
const signUp = Router();

async function checkUser(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { userName, email } = req.body;

    try {
        const q = `SELECT * FROM users WHERE userName = ? OR email = ?`;
        const result = await db.executeQuery(q, [userName, email]);

        if (result.length !== 0) {
            if (result[0].userName === userName) {
                return res.status(400).send("Username Already Exists Try Another");
            } else if (result[0].email === email) {
                return res.status(400).send("Email Already Exists Try Another");
            }
            return res.status(400).send("UserName or Email Already Exists");
        }

        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const user = {
            name: req.body.name,
            userName,
            email,
            password: hashedPassword,
            bio: req.body.bio || ''
        };

        req.user = user;
        next();
    } catch (e) {
        console.error(e);
        return res.status(500).send("Internal Server Error");
    }
}

signUp.post("/signUp",
    body('email').isEmail(),
    checkUser,
    async (req, res) => {
        const user = req.user;
        const q = `INSERT INTO users(name, userName, email, password, bio) VALUES(?, ?, ?, ?, ?)`;
        const values = [user.name, user.userName, user.email, user.password, user.bio];

        try {
            await db.executeQuery(q, values);
            res.status(201).send("User Added Successfully");
        } catch (e) {
            console.error(e);
            res.status(500).send("Error Creating New User");
        }
    });

export default signUp;
