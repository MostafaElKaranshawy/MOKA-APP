import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';
import Session from '../modules/session.mjs';

dotenv.config();

const CheckUser = async (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1];
    
    console.log(token);
    if(token == null)return res.sendStatus(401);

    try{
        await Session.checkSession(token);
    }
    catch(err){
        return res.status(404).send("Session Not Allowed")
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if(err)return res.status(403).send("Session Not Found");
        req.user = user;
        next();
    })
}

export default CheckUser;