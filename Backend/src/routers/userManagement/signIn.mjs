import DataBase from "../../modules/dataBase.mjs";
import Router from "router";
import bcrypt from 'bcrypt';
import { body, validationResult } from 'express-validator';

let db = new DataBase();
db.connectDataBase();
const signIn = Router();

async function checkUser(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const email = req.body.email;
    try {
        const q = `SELECT * FROM users WHERE email = ?`;
        const result = await db.executeQuery(q, [email]);
        req.result = result;
        next();
    } catch (error) {
        console.error('Error querying the database:', error);
        return res.status(500).send("Internal Server Error");
    }
}

signIn.post("/signIn",
    body('email').isEmail(),
    checkUser,
    async (req, res) => {
        const result = req.result;

        if (result.length === 0) {
            console.log("User not found");
            return res.status(404).send("Email Not Found");
        }

        const user = result[0];
        const isMatch = await bcrypt.compare(req.body.password, user.password);

        if (!isMatch) {
            console.log("Wrong Password");
            return res.status(400).send("Wrong Password");
        }

        console.log("Signed in successfully");
        return res.status(200).send("Signed in successfully");
    }
);

export default signIn;
