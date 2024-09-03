// import User from "../modules/user.mjs";
import Session from "../modules/session.mjs";
class SessionService{
    static async createSession(userID, accessToken){
        try {
            const session = Session.createSession(userID, accessToken)
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
            const session = Session.checkSession(userID, token);
            if(!session){
                throw new Error("Session not found");
            } 
            return session;
        }
        catch(err){
            throw new Error(err.message);
        }
    }
    
}
export default SessionService;