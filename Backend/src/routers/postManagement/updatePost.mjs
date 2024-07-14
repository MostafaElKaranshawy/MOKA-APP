import DataBase from "../../modules/dataBase.mjs";
import Router from "router";

let db = new DataBase();
db.connectDataBase();
const updatePost = Router();

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

updatePost.patch("/updatePost",
    async (req, res) => {
        const { userName, content, postID } = req.body;
        try {
            const q = `SELECT userID FROM users WHERE userName = ?`;
            const getUserId = await db.executeQuery(q, [userName]);

            if (getUserId.length !== 0) {
                const userID = getUserId[0].userID;
                const post = {
                    userID: userID,
                    postID: postID,
                    content: content,
                    time: getMySQLDateTime(),
                };
                console.log(post.time);
                // console.log(userID);

                let updatePostQuery = "UPDATE posts SET content = ?, time = ? WHERE postID = ?";
                await db.executeQuery(updatePostQuery, [post.content, post.time, post.postID]);

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

export default updatePost;
