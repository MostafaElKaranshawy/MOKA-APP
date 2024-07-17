import DataBase from "./dataBase.mjs";

const db = new DataBase();
db.connectDataBase();
class Comment {
    static async addComment(comment){
        const q = `INSERT INTO comments (content, postID)VALUES (?, ?)`;
        try {await db.executeQuery(q, [comment.content, comment.postID]);}
        catch (error) {throw new Error("Error adding comment");}
    }
    static async getComments(postID){
        const postQ = 'SELECT * FROM posts WHERE postID = ?';
        const post = await db.executeQuery(postQ, [postID]);
        if(post == null || post.length == 0){throw new Error("Post Not Found");}
        const q = `SELECT *,DATE_FORMAT(time, '%Y-%m-%d %H:%i:%s') as time FROM comments WHERE postID = ? ORDER BY time DESC`;
        try {return await db.executeQuery(q, [postID]);}
        catch (error) {throw new Error("Error getting comments");}
    }
    static async deleteComment(commentID){

        const comment = await this.getComment(commentID);
        if(comment == null || comment.length == 0)throw new Error("comment Not Found");
        
        const q = `DELETE FROM comments WHERE commentID = ?`;
        try {return await db.executeQuery(q, [commentID]);}
        catch(err) {throw new Error("Error deleting");}
    }
    static async updateComment(commentID, newContent){
        
        const comment = await this.getComment(commentID);
        if(comment == null || comment.length == 0)throw new Error("comment Not Found");

        let updatecommentQuery = "UPDATE comments SET content = ? WHERE commentID = ?";
        try{await db.executeQuery(updatecommentQuery, [newContent, commentID]);}
        catch(err) {throw new Error("Error updating");}
    }
    static async getComment(commentID){
        const q = `SELECT *,DATE_FORMAT(time, '%Y-%m-%d %H:%i:%s') as time FROM comments WHERE commentID = ? ORDER BY time DESC`;
        try {return await db.executeQuery(q, [commentID]);}
        catch (error) {throw new Error("Error getting comments");}
    }
}
export default Comment;