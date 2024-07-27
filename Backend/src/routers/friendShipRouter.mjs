import FriendShipController from "../controllers/freindShipController.mjs";

import Router from "router";

const friendShipRouter = new Router();

friendShipRouter.post("/addFriend/:userID/:friendID", FriendShipController.addFriend);
friendShipRouter.delete("/removeFriend/:userID/:friendID", FriendShipController.removeFriend);
friendShipRouter.get("/getFriends/:userID", FriendShipController.getFriends);
friendShipRouter.get("/getFriendFriends/:friendID", FriendShipController.getFriendFriends);
friendShipRouter.patch("/acceptFriend/:userID/:friendID", FriendShipController.acceptFriend);

export default friendShipRouter;