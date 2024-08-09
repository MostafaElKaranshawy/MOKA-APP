import Router from "router";

import PostController from "../controllers/postController.mjs";
import {paginationValidation} from "../middleWares/paginationValidation.mjs";


const postRouter = Router();

postRouter.post("/post", paginationValidation ,PostController.addPost);              // Add a post
postRouter.get("/posts", PostController.getPosts);              // Get a post
postRouter.delete("/posts/:postID", PostController.deletePost); // Delete a post
postRouter.patch("/posts/:postID", PostController.updatePost);  // Update a post
export default postRouter;