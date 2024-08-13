import FriendShipController from "../controllers/freindShipController.mjs";

import Router from "router";

const friendShipRouter = new Router();

friendShipRouter.post("/friends/requests/:friendID", FriendShipController.sendFriendRequest);
friendShipRouter.patch("/friends/requests/:friendID", FriendShipController.acceptFriendRequest);
friendShipRouter.delete("/friends/requests/:friendID", FriendShipController.removeFriendRequest);
friendShipRouter.get("/friends/requests", FriendShipController.getFriendRequests);
friendShipRouter.get("/friends/", FriendShipController.getFriends);
friendShipRouter.delete("/friends/:friendID", FriendShipController.removeFriend);

export default friendShipRouter;