import DataBase from "./dataBase.mjs";

const db = new DataBase();
db.connect();

class FriendShip{
    static async addFriend(friendShip){
        try {
            const checkFriend = await db.User.findOne({
                where: {
                    userID: friendShip.friendID
                }
            });
            if(checkFriend == null)throw new Error("Cannot find friend");
            const friendship = await db.FriendShip.create({
                status: 0
            });
            const user1 = await db.User.findOne({
                where: {
                    userID: friendShip.userID
                }
            });
            const user2 = await db.User.findOne({
                where: {
                    userID: friendShip.friendID
                }
            });
            await friendship.setFriend1(user1);
            await friendship.setFriend2(user2);
        }
        catch(err){
            throw new Error(err.message);
        }
    }
    static async acceptFriend(friendShip){
        try {
            const checkFriendShip = await db.FriendShip.findOne({
                where: {
                    userID: friendShip.userID,
                    friendID: friendShip.friendID
                }
            });
            if(checkFriendShip == null)throw new Error("Cannot find friendship");
            checkFriendShip.status = 1;
            await checkFriendShip.save();
        }
        catch(err){
            throw new Error(err.message);
        }
    }
    static async removeFriend(friendShip){
        try {
            const checkFriendShip = await db.FriendShip.findOne({
                where: {
                    userID: friendShip.userID,
                    friendID: friendShip.friendID
                }
            });
            if(checkFriendShip == null)throw new Error("Cannot find friendship");
            await checkFriendShip.destroy();
        }
        catch(err){
            throw new Error(err.message);
        }
    }
    static async getFriends(userID){
        try {
            console.log(userID);
            const Op = db.getOp();
            const friends = await db.FriendShip.findAll({
                where: {
                    [Op.or]: [{ userID: userID },{ friendID: userID }],
                    status: 1  // Only accepted friendships
                }
            });
            console.log(friends);
            return friends;
        }
        catch(err){
            throw new Error(err.message);
        }
    }
    static async getFriendFriends(friendID){
        try {
            const friends = await db.FriendShip.findAll({
                where: {
                    userID: friendID
                }
            });
            return friends;
        }
        catch(err){
            throw new Error(err.message);
        }
    }
}
export default FriendShip;