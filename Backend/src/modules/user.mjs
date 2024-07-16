import DataBase from "./dataBase.mjs";
const db = new DataBase();
db.connectDataBase();

class User{
    static async addUser(user){
        const q = `INSERT INTO users(name, userName, email, password, bio) VALUES(?, ?, ?, ?, ?)`;
        const values = [user.name, user.userName, user.email, user.password, user.bio];
        try{
            await db.executeQuery(q, values);
        }
        catch(err){
            // console.log(err);
            return err;
        }
    }
    static async getUserID(userName){
        const q = `SELECT userID FROM users WHERE userName = ?`;
        const values = [userName];
        try{
            const result = await db.executeQuery(q, values);
            // console.log("user id : "+ result[0].userID);
            return result[0].userID;
        }
        catch(err){
            return err;
        }   
    }
}
export default User;