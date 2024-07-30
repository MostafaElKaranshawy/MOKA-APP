import FriendShipController from "../controllers/freindShipController.mjs";

import Router from "router";

const friendShipRouter = new Router();

friendShipRouter.post("/friends/:friendID", FriendShipController.addFriend);
friendShipRouter.delete("/friends/:friendID", FriendShipController.removeFriend);
friendShipRouter.get("/friends/", FriendShipController.getFriends);
friendShipRouter.get("/friends/mutualFriends/:friendID", FriendShipController.getFriendFriends);
friendShipRouter.patch("/friends/requests/:friendID", FriendShipController.acceptFriend);

export default friendShipRouter;