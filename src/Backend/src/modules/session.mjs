import SessionDefinition from './definitions/sessionDefinition.mjs'
import UserDefinition from './definitions/userDefinition.mjs'

export default class Session {
    static async createSession(userID, accessToken){
        try {
            const user = await UserDefinition.findOne({
                where: {
                    userID: userID
                }
            });
            const session = await user.createSession({
                token : accessToken,
                expiredAt: new Date(new Date().getTime() + 3*24*60*60*1000)
            });
            if(!session){
                throw new Error("Session not created");
            }
            return session;
        }
        catch(err){
            throw new Error(err.message);
        }
    }
    static async checkSession(userID, token){
        try {
            let session = await SessionDefinition.findOne({
                where: {
                    token: token,
                    userID: userID
                }
            });
            if(session == null){
                throw new Error("Session not found");
            }
            if(new Date(session.expiredAt) <= new Date()){
                throw new Error("Session Expired");
            }
            session.expiredAt = new Date(new Date().getTime() + 3*24*60*60*1000);
            await session.save();
            return session;
        }
        catch(err){
            throw new Error(err.message);
        }
    }
    static async deleteSession(userID, token){
        try {
            const session = await SessionDefinition.destroy({
                where: {
                    userID: userID,
                    token: token
                }
            });
            if(!session){
                throw new Error("Session not deleted");
            }
            return session;
        }
        catch(err){
            throw new Error(err.message);
        }
    }
}