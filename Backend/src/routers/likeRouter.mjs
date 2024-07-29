import likeController from "../controllers/likeController.mjs";
import Router from "router";

const likeRouter = new Router();

likeRouter.get('/getPostLikes/:postID', likeController.getPostLikes);
likeRouter.get('/getCommentLikes/:commentID', likeController.getCommentLikes);
likeRouter.post('/addPostLike/:postID', likeController.addPostLike);
likeRouter.post('/addCommentLike/:commentID', likeController.addCommentLike);
likeRouter.delete('/removePostLike/:postID/:likeID', likeController.removePostLike);
likeRouter.delete('/removePostLike/:commentID/:likeID', likeController.removeCommentLike);
export default likeRouter;