import likeController from "../controllers/likeController.mjs";
import Router from "router";

const likeRouter = new Router();

likeRouter.get('/posts/:postID/likes', likeController.getPostLikes);                                       // get likes on a post
likeRouter.get('/posts/:postID/comments/:commentID/likes', likeController.getCommentLikes);                 // get likes on a comment on a post
likeRouter.post('/posts/:postID/like', likeController.addPostLike);                                        // add likes on a post
likeRouter.post('/posts/:postID/comments/:commentID/like', likeController.addCommentLike);                 // add likes on a comment on a post
likeRouter.delete('/posts/:postID/likes/:likeID', likeController.removePostLike);                           // remove likes on a post
likeRouter.delete('/posts/:postID/comments/:commentID/likes/:likeID', likeController.removeCommentLike);    // remove likes on a comment on a post
export default likeRouter;