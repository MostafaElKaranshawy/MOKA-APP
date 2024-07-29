import jwt from 'jsonwebtoken'
import DataBase from "../modules/dataBase.mjs"
import dotenv from 'dotenv';

dotenv.config();

const db = new DataBase();
db.connectDataBase();


const CheckUser = async (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1];
    // const sessionQuery = `select *, DATE_FORMAT(time, '%Y-%m-%d %H:%i:%s') as expiredAt from sessions where token=?`;
    // const result = null
    // try{
    //     result = await db.executeQuery(sessionQuery, [token]);
    //     if(result[0].expiredAt <= Date.now()){
    //         res.status(404).send("Session Expired");
    //     }
    // }
    // catch(e){
    //     return res.status(404).send("Session not found, Try sign in again.");
    // }
    console.log(token);
    if(token == null)return res.sendStatus(401);

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if(err)return res.status(403).send("Session Not Found");
        req.user = user;
        next();
    })
}

export default CheckUser;