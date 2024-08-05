import DataBase from "./dataBase.mjs";
const db = new DataBase();
db.connectDataBase();

export default class Session {
    static async createSession(userID, accessToken) {
        try{
            await this.checkSession(userID);

        }
        catch(err){
            if(err.message === "Session not Found"){
                const q = `INSERT INTO sessions (userID, token, expiredAt) VALUES (?, ?, date_add(now(), interval 3 day))`;
                try{
                    await db.executeQuery(q, [userID, accessToken]);
                }
                catch(err){
                    throw new Error(err.message);
                }
            }
            else throw new Error(err.message);
        }
    }
    static async checkSession(userID){
        const q = `SELECT * FROM sessions WHERE userID =?`;
        try {
            let session = await db.executeQuery(q, [userID]);
            console.log(session);
            if(session == null || session.length == 0)throw new Error("Session not Found");
            if(new Date(session[0].expiredAt) <= new Date())throw new Error("Session Expired");
            console.log("session checked")
            let updateSession = `UPDATE sessions SET expiredAt = date_add(now(), interval 3 day) WHERE userID = ?`;
            await db.executeQuery(updateSession, [userID]);
            console.log("session updated")
        }
        catch(err){
            throw new Error(err.message);
        }
    }
    static async clearExpiredSessions(){
        const q = `DELETE FROM sessions WHERE expiredAt <= now()`;
        try{
            await db.executeQuery(q);
        }
        catch(err){
            throw new Error(err.message);
        }
    }
}