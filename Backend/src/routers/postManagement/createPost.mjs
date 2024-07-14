import DataBase from "../../modules/dataBase.mjs";
import Router from "router";

let db = new DataBase();
db.connectDataBase();
const createPost = Router();

createPost.post("/createPost",
    async (req, res) => {
        const { userName, content } = req.body;
        try {
            const q = `SELECT userID FROM users WHERE userName = ?`;
            const getUserId = await db.executeQuery(q, [userName]);

            if (getUserId.length !== 0) {
                const userID = getUserId[0].userID;
                const post = {
                    userID: userID,
                    content: content,
                };

                let createPostQuery = "INSERT INTO posts(userID, content) VALUES (?, ?)";
                await db.executeQuery(createPostQuery, [post.userID, post.content]);

                let getPostQuery = "SELECT *,DATE_FORMAT(time, '%Y-%m-%d %H:%i:%s') as time FROM posts WHERE userID = ?";
                const posts = await db.executeQuery(getPostQuery, [post.userID]);
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

export default createPost;
