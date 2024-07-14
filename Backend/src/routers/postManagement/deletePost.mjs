import DataBase from "../../modules/dataBase.mjs";
import Router from "router";

let db = new DataBase();
db.connectDataBase();
const deletePost = Router();

deletePost.delete("/deletePost",
    async (req, res) => {
        const userName= req.body.userName;
        try {
            const q = `SELECT userID FROM users WHERE userName = ?`;
            const getUserId = await db.executeQuery(q, [userName]);

            if (getUserId.length !== 0) {
                const userID = getUserId[0].userID;
                console.log(req.body.postID);
                console.log(userID);
                let deletePostQuery = "DELETE FROM posts Where userID = ? AND postID = ?";
                await db.executeQuery(deletePostQuery, [userID, req.body.postID]);

                let getPostQuery = "SELECT *,DATE_FORMAT(time, '%Y-%m-%d %H:%i:%s') as time FROM posts WHERE userID = ?";
                const posts = await db.executeQuery(getPostQuery, [userID]);
                console.log(posts[posts.length - 1].time);

                return res.status(200).send(posts);
            } else{
                return res.status(400).send("User Not Found");
            }
        } catch (e) {
            console.error(e);
            return res.status(500).send("Internal Server Error");
        }
    });

export default deletePost;
