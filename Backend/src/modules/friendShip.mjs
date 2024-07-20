import DataBase from "./dataBase.mjs";
const db = new DataBase();
db.connectDataBase();

class FriendShip {
    static async addFriend(friendShip){
        const checkFriend = await db.executeQuery(`SELECT * FROM users WHERE userID = ?`, [friendShip.friendID]);
        if(checkFriend == null || checkFriend.length == 0)throw new Error("Cannot find friend");
        const q = `INSERT INTO friendships(userID, friendID) VALUES(?,?)`;
        try{await db.executeQuery(q, [friendShip.userID, friendShip.friendID, ]);}
        catch(error) {throw new Error("Cannot find friend")};
    }
    static async acceptFriend(friendShip){
        const checkFriendShip = await db.executeQuery(`SELECT * FROM friendships WHERE userID = ? AND friendID = ?`, [friendShip.friendID, friendShip.userID]);
        if(checkFriendShip == null || checkFriendShip.length == 0)throw new Error("Cannot find friendship");
        const q = `UPDATE friendships SET status = 1 WHERE userID = ? AND friendID = ?`;
        try{await db.executeQuery(q, [friendShip.friendID, friendShip.userID]);}
        catch(error) {throw new Error("Cannot find friend")};
    }
    static async removeFriend(friendShip){
        const checkFriendShip = await db.executeQuery(`SELECT * FROM friendships WHERE userID = ? AND friendID = ?`, [friendShip.userID, friendShip.friendID]);
        if(checkFriendShip == null || checkFriendShip.length == 0)throw new Error("Cannot find friendship");
        const q = `DELETE FROM friendships WHERE userID = ? AND friendID = ?`;
        try {db.executeQuery(q, [friendShip.userID, friendShip.friendID]);}
        catch(err){throw new Error("Cannot find friend");}
    }

    // the user add friends or friends add the user
    static async getFriends(userID){
        const q = `SELECT * FROM friendships WHERE (userID = ? || friendID = ?) && status = 1`;
        try {
            let friends = db.executeQuery(q, [userID, userID]);
            if(friends == null)throw new Error ("User Not Found");
            return friends;
        }
        catch(err){
            throw new Error("User Not Found");
        }
    }

    // friends of my friend Suggestions
    static async getFriendFriends(friendID){
        const q = `SELECT * FROM friendships WHERE userID = ?`;
        try {
            let friends = db.executeQuery(q, [friendID]);
            if(friends == null)throw new Error ("User Not Found");
            return friends;
        }
        catch(err){
            throw new Error("User Not Found");
        }
    }
}

export default FriendShip;