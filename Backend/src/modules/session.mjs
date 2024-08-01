import DataBase from "./dataBase.mjs";
const db = new DataBase();
db.connectDataBase();

export default class Session {
    static async createSession(userID, accessToken) {
        const q = `INSERT INTO sessions (userID, token, expiredAt) VALUES (?, ?, date_add(now(), interval 3 day))`;
        try{
            await db.executeQuery(q, [userID, accessToken]);
        }
        catch(err){
            throw new Error(err.message);
        }
    }
    static async checkSession(accessToken){
        const q = `SELECT * FROM sessions WHERE token =? and expiredAt > now()`;
        try {
            let result = await db.executeQuery(q, [accessToken]);
            if(result == null || result.length == 0)throw new Error("Session not Found");
        }
        catch(err){
            throw new Error('cannot find session');
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