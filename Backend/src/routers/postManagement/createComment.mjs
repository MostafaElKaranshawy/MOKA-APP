import DataBase from "../../modules/dataBase.mjs";
import Router from "router";

let db = new DataBase();
db.connectDataBase();
const createComment = Router();

async function checkBody(req, res, next) {
    const { userName, content, postID } = req.body;
    const q = `SELECT userID FROM users WHERE userName = ?`;
    const getUserId = await db.executeQuery(q, [userName]);

    if (getUserId.length !== 0) {
        let userID = getUserId[0].userID;
        let checkPostID = "SELECT postID FROM posts WHERE postID = ?";
        let result = await db.executeQuery(checkPostID, [postID]);
        if(result.length > 0) {
            req.userID = userID;
            next();
        }
        else{
            return res.status(400).send("Post Not Found");
        }
    } else{
        return res.status(400).send("User Not Found");
    }
} 

createComment.post("/createComment",checkBody,
    async (req, res) => {
        const { userName, content, postID } = req.body;
        try {
            const userID = req.userID;
            let createCommentQuery = "INSERT INTO comments(userID, postID, content) VALUES (?, ?, ?)";
            await db.executeQuery(createCommentQuery, [userID, postID,content]);
            let getPostQuery = "SELECT *,DATE_FORMAT(time, '%Y-%m-%d %H:%i:%s') as time FROM comments WHERE postID = ? ORDER BY time DESC";
            let comments = await db.executeQuery(getPostQuery, [postID]);
            return res.status(200).send(comments);
        } catch (e) {
            console.error(e);
            return res.status(500).send("Internal Server Error");
        }
    });

export default createComment;
