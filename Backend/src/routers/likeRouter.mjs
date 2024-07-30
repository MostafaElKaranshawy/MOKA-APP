import likeController from "../controllers/likeController.mjs";
import Router from "router";

const likeRouter = new Router();

likeRouter.get('/post/:postID/likes/', likeController.getPostLikes);
likeRouter.get('/post/:postID/comment/:commentID/likes', likeController.getCommentLikes);
likeRouter.post('/post/:postID/likes', likeController.addPostLike);
likeRouter.post('/post/:postID/comments/:commentID/likes', likeController.addCommentLike);
likeRouter.delete('/posts/:postID/likes/:likeID', likeController.removePostLike);
likeRouter.delete('/posts/:postID/comments/:commentID/likes/:likeID', likeController.removeCommentLike);
export default likeRouter;