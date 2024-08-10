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
            throw new Error(err.message);
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
            throw new Error(err.message);
        }
    }
}

export default User;