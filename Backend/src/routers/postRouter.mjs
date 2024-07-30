import Router from "router";

import PostController from "../controllers/postController.mjs";


const postRouter = Router();

postRouter.post("/post", PostController.addPost);
postRouter.get("/post", PostController.getPosts);
postRouter.delete("/post/:postID", PostController.deletePost);
postRouter.patch("/post/:postID", PostController.updatePost);
export default postRouter;