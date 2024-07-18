import DataBase from "./dataBase.mjs";
const db = new DataBase();
db.connectDataBase();

class Like{
    static async addLike(like){
        console.log(like);
        if(like.commentID != null){
            console.log("comment");
            const q = `INSERT INTO likes(commentID, userID, type) VALUES(?,?,?)`;
            try{await db.executeQuery(q, [like.commentID, like.userID, like.type]);}
            catch(error) {throw new Error("Cannot find comment")};
        }
        else if(like.postID != null){
            console.log("post");
            const q = `INSERT INTO likes(postID, userID, type) VALUES(?,?,?)`;
            try{await db.executeQuery(q,[ like.postID, like.userID, like.type]);}
            catch(error) {throw new Error("Cannot find post")};
        }
    }
    static async removeLike(like){
        // console.log(like.likeID); 
        if(like.likeID == null)throw new Error("cannot find like");
        const findLike = await db.executeQuery(`SELECT * FROM likes WHERE likeID = ?`, [like.likeID]);
        if(findLike == null || findLike.length == 0)throw new Error("cannot find like");
        const q = `DELETE FROM likes WHERE likeID = ?`;
        try {db.executeQuery(q, [like.likeID]);}
        catch(err){throw new Error("Cannot find like");}
    }
    static async getPostLikes(postID){
        const q = `SELECT * FROM likes WHERE postID = ?`;
        try {
            let likes = db.executeQuery(q, [postID]);
            if(likes == null)throw new Error ("Post Not Found");
            return likes;
        }
        catch(err){
            throw new Error("Post Not Found");
        }
    }
    static async getCommentLikes(commentID){
        const q = `SELECT * FROM likes WHERE commentID = ?`;
        try {
            let likes = db.executeQuery(q, [commentID]);
            if(likes == null)throw new Error ("comment Not Found");
            return likes;
        }
        catch(err){
            throw new Error("comment Not Found");
        }
    }
}
export default Like;