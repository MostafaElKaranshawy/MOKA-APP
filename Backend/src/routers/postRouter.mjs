import Router from "router";

import PostController from "../controllers/postController.mjs";


const postRouter = Router();

postRouter.post("/addPost", PostController.addPost);
postRouter.get("/getPosts", PostController.getPosts);
postRouter.delete("/deletePost/:postID", PostController.deletePost);
postRouter.patch("/updatePost/:postID", PostController.updatePost);
export default postRouter;