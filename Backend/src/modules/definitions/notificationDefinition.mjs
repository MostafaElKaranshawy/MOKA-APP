import {orm, DataTypes } from "../../config/orm.mjs";

const notificationDefinition = orm.define('notification',
    {
        fromID : {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        toID: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false
        },
        content: {
            type: DataTypes.STRING,
            allowNull: false
        },
        seen: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
    },
    {
        timestamps: true
    }
);
export default notificationDefinition;

notificationDefinition.associate = async (models) => {
    const {notification, user, post, friendShip} = models;
    notification.belongsTo(user, {as: 'userfrom', foreignKey : 'fromID', onDelete: 'CASCADE'});
    notification.belongsTo(user, {as: 'userto', foreignKey : 'toID', onDelete: 'CASCADE'});
    notification.belongsTo(post, {foreignKey : 'postID'});
    notification.belongsTo(friendShip, {as:'notification',foreignKey : 'friendRequestID', onUpdate: 'CASCADE', onDelete: 'CASCADE'});
}