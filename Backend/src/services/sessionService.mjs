import User from "../modules/user.mjs";
import Session from "../modules/session.mjs";
class SessionService{
    static async createSession(userID, accessToken){
        try {
            const user = await User.findOne({
                where: {
                    userID: userID
                }
            });
            const session = await user.createSession({
                token : accessToken,
                expiredAt: new Date(new Date().getTime() + 3*24*60*60*1000)
            });
            return session;
        }
        catch(err){
            throw new Error(err.message);
        }
    }
    static async checkSession(userID, token){
        try {
            const user = await User.findOne({
                where: {
                    userID: userID
                }
            })
            let session = await user.getSessions({
                where: {
                    token: token
                }
            });
            if(session == null || session.length == 0){
                throw new Error("Session not found");
            }
            else{
                session = session[0];
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
    
}
export default SessionService;