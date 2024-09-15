import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';
import SessionService from '../services/sessionService.mjs';
import {wss} from '../config/wss.mjs';
import {WebSocket} from 'ws';

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
            // console.log(user);
        })
        const session = await SessionService.checkSession(req.user.userID, token);
        if(session == null)return res.status(401).send("Session not found");
        
    }
    catch(err){
        return res.status(403).send(err.message);
    }
    next();
}

export default CheckUser;