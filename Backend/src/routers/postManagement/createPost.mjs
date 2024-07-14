import DataBase from "../../modules/dataBase.mjs";
import Router from "router";

let db = new DataBase();
db.connectDataBase();
const createPost = Router();

function getMySQLDateTime() {
    const now = new Date();
    
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    const mysqlDate = `${year}-${month}-${day}`;
    const mysqlTime = `${hours}:${minutes}:${seconds}`;
    const mysqlDateTime = `${mysqlDate} ${mysqlTime}`;
    
    return mysqlDateTime;
}

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
                    time: getMySQLDateTime(),
                };
                console.log(post.time);
                // console.log(userID);

                let createPostQuery = "INSERT INTO posts(userID, content, time) VALUES (?, ?, ?)";
                await db.executeQuery(createPostQuery, [post.userID, post.content, post.time]);

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
