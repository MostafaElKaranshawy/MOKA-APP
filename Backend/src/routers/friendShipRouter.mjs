import FriendShipController from "../controllers/freindShipController.mjs";

import Router from "router";

const friendShipRouter = new Router();

friendShipRouter.post("/addFriend", FriendShipController.addFriend);
friendShipRouter.delete("/removeFriend", FriendShipController.removeFriend);
friendShipRouter.get("/getFriends", FriendShipController.getFriends);
friendShipRouter.get("/getFriendFriends", FriendShipController.getFriendFriends);
friendShipRouter.patch("/acceptFriend", FriendShipController.acceptFriend);

export default friendShipRouter;