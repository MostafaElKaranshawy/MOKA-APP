import Router from "router";

import PostController from "../controllers/postController.mjs";


const postRouter = Router();

postRouter.post("/addPost", PostController.addPost);

export default postRouter;