import FriendShipController from "../controllers/freindShipController.mjs";

import Router from "router";

const friendShipRouter = new Router();

friendShipRouter.post("/addFriend/:friendID", FriendShipController.addFriend);
friendShipRouter.delete("/removeFriend/:friendID", FriendShipController.removeFriend);
friendShipRouter.get("/getFriends/", FriendShipController.getFriends);
friendShipRouter.get("/getFriendFriends/:friendID", FriendShipController.getFriendFriends);
friendShipRouter.patch("/acceptFriend/:friendID", FriendShipController.acceptFriend);

export default friendShipRouter;