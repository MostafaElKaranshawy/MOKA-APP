import Router from "router";

import commentController from "../controllers/commentController.mjs";


const commentRouter = Router();

commentRouter.post("/posts/:postID/comments/:commentID", commentController.addComment);         // Add a comment
commentRouter.get("/posts/:postID/comments", commentController.getComments);                    // Get comments on a post
commentRouter.delete("/posts/:postID/comments/:commentID", commentController.deleteComment);    // Delete a comment
commentRouter.patch("/posts/:postID/comments/:commentID", commentController.updateComment);     // Update a comment
export default commentRouter;