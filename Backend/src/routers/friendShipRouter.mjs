import FriendShipController from "../controllers/freindShipController.mjs";

import Router from "router";

const friendShipRouter = new Router();

friendShipRouter.post("/friends/requests/:friendID", FriendShipController.sendFriendRequest);

friendShipRouter.patch("/friends/requests/:friendID", FriendShipController.acceptFriendRequest);

friendShipRouter.delete("/friends/requests/:friendID", FriendShipController.removeFriendRequest);
friendShipRouter.delete("/friends/:friendID", FriendShipController.removeFriend);

friendShipRouter.get("/friends/requests", FriendShipController.getFriendRequests);
friendShipRouter.get("/:userName/friends/", FriendShipController.getFriends);
friendShipRouter.get("/friends/status/:friendID", FriendShipController.getFriendStatus);
export default friendShipRouter;