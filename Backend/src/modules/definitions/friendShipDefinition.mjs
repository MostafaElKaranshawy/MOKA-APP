import {orm, DataTypes } from "../../config/orm.mjs";

const FriendShipDefinition = orm.define('friendShip', 
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

export default FriendShipDefinition;

FriendShipDefinition.associate = async (models) => {
    const {user, friendShip} = models;
    friendShip.belongsTo(user, {as: 'Friend1', foreignKey: 'user1ID'});
    friendShip.belongsTo(user, {as: 'Friend2', foreignKey: 'user2ID'});
    friendShip.belongsTo(user, {as: 'Sender', foreignKey: 'senderID'});
}
