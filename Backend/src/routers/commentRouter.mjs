import Router from "router";

import commentController from "../controllers/commentController.mjs";


const commentRouter = Router();

commentRouter.post("/addComment/:postID/:commentID", commentController.addComment);
commentRouter.get("/getComments/:postID", commentController.getComments);
commentRouter.delete("/deleteComment/:postID/:commentID", commentController.deleteComment);
commentRouter.patch("/updateComment/:postID/:commentID", commentController.updateComment);
export default commentRouter;