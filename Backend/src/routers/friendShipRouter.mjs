import FriendShipController from "../controllers/freindShipController.mjs";

import Router from "router";

const friendShipRouter = new Router();

friendShipRouter.post("/friends/:friendID", FriendShipController.addFriend);                        // send a friend request
friendShipRouter.delete("/friends/:friendID", FriendShipController.removeFriend);                   // remove a friend
friendShipRouter.get("/friends/requests", FriendShipController.getFriendRequests);                 // get a list of friend requests
friendShipRouter.get("/friends/", FriendShipController.getFriends);                                 // get a list of friends
friendShipRouter.get("/friends/mutualFriends/:friendID", FriendShipController.getFriendFriends);    // get a list of mutual friends
friendShipRouter.patch("/friends/requests/:friendID", FriendShipController.acceptFriend);           // accept a friend request

export default friendShipRouter;