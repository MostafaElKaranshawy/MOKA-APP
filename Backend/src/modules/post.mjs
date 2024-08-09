import DataBase from "./dataBase.mjs";

const db = new DataBase();
db.connect();

class Post {
    static async addPost(post){
        try {
            const user = await db.User.findOne({
                where: {
                    userID: post.userID
                }
            });
            await user.createPost({
                content : post.content
            });
        }
        catch(err){
            return err;
        }
    }
    static async getPosts(userID, limit, offset){
        try {
            const user = await db.User.findOne({
                where: {
                    userID: userID
                }
            });
            const posts = await user.getPosts({
                offset: offset || 0,
                limit: limit || 10
            });
            console.log(posts);
            return posts;
        }
        catch(err){
            return err;
        }
    }
    static async deletePost(postID){
        try {
            return await db.Post.destroy({
                where: {
                    postID: postID
                }
            });
        }
        catch(err){
            return err;
        }
    }
    static async updatePost(postID, newContent){
        try {
            await db.Post.update({
                content: newContent
            },
            {
                where: {
                    postID: postID
                }
            });
            
        }
        catch(err){
            return err;
        }
    }
    static async getPost(postID){
        try {
            const post = await db.Post.findOne({
                where: {
                    postID: postID
                }
            });
            return post;
        }
        catch(err){
            return err;
        }
    }
}
export default Post;