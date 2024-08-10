import DataBase from "./dataBase.mjs";

const db = new DataBase();
db.connect();

class Session{
    static async createSession(userID, accessToken){
        try {
            const user = await db.User.findOne({
                where: {
                    userID: userID
                }
            });
            await user.createSession({
                token : accessToken,
                expiredAt: new Date(new Date().getTime() + 3*24*60*60*1000)
            });
            const session = await user.getSession();
            console.log(session);
        }
        catch(err){
            throw new Error(err.message);
        }
    }
    static async checkSession(userID){
        try {
            const user = await db.User.findOne({
                where: {
                    userID: userID
                }
            })
            const session = await user.getSession();
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
    
}
export default Session;