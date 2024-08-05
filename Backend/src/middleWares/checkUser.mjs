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
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if(err)throw new Error("Token not found or expired");
            req.user = user;
            console.log(user);
        })
        await Session.checkSession(req.user.userID);
    }
    catch(err){
        return res.status(403).send(err.message);
    }
    next();
}

export default CheckUser;