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
        console.log(userID);
        const q = `SELECT *,DATE_FORMAT(time, '%Y-%m-%d %H:%i:%s') as time FROM posts WHERE userID = ? ORDER BY time DESC`;
        try {return await db.executeQuery(q, [userID]);}
        catch (error) {throw new Error("Error getting posts");}
    }
    static async deletePost(postID){
        
        const post = await this.getPost(postID);
        if(post == null || post.length == 0)throw new Error("Post Not Found");
        
        const q = `DELETE FROM posts WHERE postID = ?`;
        try {return await db.executeQuery(q, [postID]);}
        catch(err) {throw new Error("Error deleting");}
    }
    static async updatePost(postID, newContent){
        
        const post = await this.getPost(postID);
        if(post == null || post.length == 0)throw new Error("Post Not Found");

        let updatePostQuery = "UPDATE posts SET content = ? WHERE postID = ?";
        try{await db.executeQuery(updatePostQuery, [newContent, postID]);}
        catch(err) {throw new Error("Error updating");}
    }
    static async getPost(postID){
        const q = `SELECT *,DATE_FORMAT(time, '%Y-%m-%d %H:%i:%s') as time FROM posts WHERE postID = ? ORDER BY time DESC`;
        try {return await db.executeQuery(q, [postID]);}
        catch (error) {throw new Error("Error getting posts");}
    }
}
export default Post;