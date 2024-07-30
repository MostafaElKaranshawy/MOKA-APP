import Router from "router";

import commentController from "../controllers/commentController.mjs";


const commentRouter = Router();

commentRouter.post("/posts/:postID/comments/:commentID", commentController.addComment);
commentRouter.get("/posts/:postID/comments", commentController.getComments);
commentRouter.delete("/posts/:postID/comments/:commentID", commentController.deleteComment);
commentRouter.patch("/posts/:postID/comments/:commentID", commentController.updateComment);
export default commentRouter;