import likeController from "../controllers/likeController.mjs";
import Router from "router";

const likeRouter = new Router();

likeRouter.get('/getPostLikes/:postID', likeController.getPostLikes);
likeRouter.get('/getCommentLikes/:commentID', likeController.getCommentLikes);
likeRouter.post('/addPostLike/:userID/:postID', likeController.addPostLike);
likeRouter.post('/addCommentLike/:userID/:commentID', likeController.addCommentLike);
likeRouter.delete('/removePostLike/:userID/:postID/:likeID', likeController.removePostLike);
likeRouter.delete('/removePostLike/:userID/:commentID/:likeID', likeController.removeCommentLike);
export default likeRouter;