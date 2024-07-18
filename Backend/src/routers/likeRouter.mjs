import likeController from "../controllers/likeController.mjs";
import Router from "router";

const likeRouter = new Router();

likeRouter.get('/getLikes', likeController.getLikes);
likeRouter.post('/addLike', likeController.addLike);
likeRouter.delete('/removeLike', likeController.removeLike);
export default likeRouter;