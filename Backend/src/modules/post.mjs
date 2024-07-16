import DataBase from "./dataBase.mjs";

const db = new DataBase();
db.connectDataBase();
class Post {
    static async addPost(post){
        const q = `INSERT INTO posts (content, userID)VALUES (?, ?)`;
        try {await db.executeQuery(q, [post.content, post.userID]);}
        catch (error) {throw new Error("Error adding post");}
    }
    static async getPosts(userID){
    const q = `SELECT *,DATE_FORMAT(time, '%Y-%m-%d %H:%i:%s') as time FROM posts WHERE userID = ? ORDER BY time DESC`;
        try {return await db.executeQuery(q, [userID]);}
        catch (error) {throw new Error("Error getting posts");}
    }
}
export default Post;