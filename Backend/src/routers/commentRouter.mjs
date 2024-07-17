import Router from "router";

import commentController from "../controllers/commentController.mjs";


const commentRouter = Router();

commentRouter.post("/addComment", commentController.addComment);
commentRouter.get("/getComments", commentController.getComments);
commentRouter.delete("/deleteComment", commentController.deleteComment);
commentRouter.patch("/updateComment", commentController.updateComment);
export default commentRouter;