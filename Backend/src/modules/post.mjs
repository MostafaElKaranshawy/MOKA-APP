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
            throw new Error(err.message);
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
            throw new Error(err.message);
        }
    }
    static async deletePost(userId,postID){
        try {
            const post = db.Post.findOne({
                where: {
                    postID: postID
                }
            });
            if(post.userID != userId){
                // console.log("post not deleted as user not the author")
                throw new Error("Only the owner of the post can delete it");
            }
            else{
                await db.Post.destroy({
                    where: {
                        postID: postID
                    }
                });
            }
        }
        catch(err){
            throw new Error(err.message);
        }
    }
    static async updatePost(userID,postID, newContent){
        try {
            const post = db.Post.findOne({
                where: {
                    postID: postID
                }
            });
            if(post.userID != userID){
                throw new Error("Only the owner of the post can update it");
            }
            else{
                await db.Post.update({
                    content: newContent
                },
                {
                    where: {
                        postID: postID
                    }
                });
            }
            
        }
        catch(err){
            throw new Error(err.message);
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
            throw new Error(err.message);
        }
    }
}
export default Post;