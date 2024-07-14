import DataBase from "../../modules/dataBase.mjs";
import Router from "router";

let db = new DataBase();
db.connectDataBase();
const deleteComment = Router();

async function checkBody(req, res, next) {
    const { userName, commentID } = req.body;
    const q = `SELECT userID FROM users WHERE userName = ?`;
    // console.log(userName);
    const getUserId = await db.executeQuery(q, [userName]);

    if (getUserId.length !== 0) {
        let userID = getUserId[0].userID;
        let checkPostID = "SELECT commentID FROM comments WHERE commentID = ?";
        let result = await db.executeQuery(checkPostID, [commentID]);
        if(result.length > 0) {
            req.userID = userID;
            next();
        }
        else{
            return res.status(400).send("Comment Not Found");
        }
    } else{
        return res.status(400).send("User Not Found");
    }
} 

deleteComment.delete("/deleteComment",checkBody,
    async (req, res) => {
        const {postID, commentID } = req.body;
        try {
            let deleteCommentQuery = "DELETE FROM comments WHERE commentID = ?";
            await db.executeQuery(deleteCommentQuery, [commentID]);
            let getPostQuery = "SELECT *,DATE_FORMAT(time, '%Y-%m-%d %H:%i:%s') as time FROM comments WHERE postID = ? ORDER BY time DESC";
            let comments = await db.executeQuery(getPostQuery, [postID]);
            return res.status(200).send(comments);
        } catch (e) {
            console.error(e);
            return res.status(500).send("Internal Server Error");
        }
    });

export default deleteComment;
