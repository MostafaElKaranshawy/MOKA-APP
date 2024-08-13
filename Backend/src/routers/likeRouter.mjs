import likeController from "../controllers/likeController.mjs";
import { paginationValidation } from "../middleWares/paginationValidation.mjs";
import Router from "router";

const likeRouter = new Router();

likeRouter.get('/posts/:postID/likes', paginationValidation ,likeController.getPostLikes);                                       // get likes on a post
likeRouter.get('/posts/:postID/comments/:commentID/likes', paginationValidation ,likeController.getCommentLikes);               // get likes on a comment on a post
likeRouter.post('/posts/:postID/like', likeController.addPostLike);                                        // add likes on a post
likeRouter.post('/posts/:postID/comments/:commentID/like', likeController.addCommentLike);                 // add likes on a comment on a post
likeRouter.delete('/posts/:postID/like', likeController.removePostLike);                           // remove likes on a post
likeRouter.delete('/posts/:postID/comments/:commentID/like', likeController.removeCommentLike);    // remove likes on a comment on a post
export default likeRouter;