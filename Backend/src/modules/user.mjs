import DataBase from "./dataBase.mjs";
const db = new DataBase();
db.connect();

class User{
    static async addUser(user){
        try {
            await db.User.create({
                name : user.name,
                userName : user.userName,
                email : user.email,
                password : user.password
            });
        }
        catch(err){
            return err;
        }
    }
    static async removeUser(userID){
        try {
            await db.User.destroy({
                where: {
                    userID: userID
                }
            });
        }
        catch(err){
            return err;
        }
    }
}

export default User;