import {orm, DataTypes } from "../config/orm.mjs";

const FriendShip = orm.define('friendShip', 
    {
        friendShipID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        status: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },
    {
        timestamps: true
    }
);

export default FriendShip;

FriendShip.associate = async (models) => {
    const {user, friendShip} = models;
    friendShip.belongsTo(user, {as: 'Friend1', foreignKey: 'userID'});
    friendShip.belongsTo(user, {as: 'Friend2', foreignKey: 'friendID'});
}

// import User from "./user.mjs";

// FriendShip.addHook('afterDefine', (model) => {
//     model.belongsTo(User, {as: 'Friend1', foreignKey: 'userID'});
//     model.belongsTo(User, {as: 'Friend2', foreignKey: 'friendID'});
// });
// FriendShip.belongsTo(User, {as: 'Friend1', foreignKey: 'userID'});
// FriendShip.belongsTo(User, {as: 'Friend2', foreignKey: 'friendID'});