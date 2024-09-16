import {orm, DataTypes } from "../../config/orm.mjs";

const UserDefinition = orm.define('user', 
    {
        userID : {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        userName: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true
        },
        email : {
            type : DataTypes.STRING(50),
            allowNull : false,
            unique: true,
        },
        password : {
            type : DataTypes.STRING(64),
            allowNull : false,
        },
        name : {
            type : DataTypes.STRING(50),
            allowNull : false,
        },
        bio :{
            type : DataTypes.STRING(200),
            allowNull : true,
        },
        profilePhotoUrl: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    },
    {
        timestamps: false
    }
);




UserDefinition.associate = async (models) => {
    //console.log(models);
    const {user, post, session, friendShip, postLike, commentLike, comment, notification} = models;
    user.hasMany(postLike, {onDelete : 'CASCADE', foreignKey : 'userID'});
    user.hasMany(commentLike, {onDelete : 'CASCADE', foreignKey : 'userID'});
    user.hasMany(comment, {onDelete : 'CASCADE', foreignKey : 'userID'});
    user.hasMany(post, {onDelete : 'CASCADE', foreignKey : 'userID'});
    user.hasMany(session, {onDelete : 'CASCADE', foreignKey : 'userID'});
    user.hasMany(friendShip, { as: 'Friend1', onDelete : 'CASCADE',foreignKey: 'user1ID'});
    user.hasMany(friendShip, {as: 'Friend2', onDelete: 'CASCADE' ,foreignKey: 'user2ID'});
    user.hasMany(friendShip, {as: 'Sender', onDelete: 'CASCADE' ,foreignKey: 'senderID'});
    user.hasMany(notification, {as: 'userfrom',onDelete: 'CASCADE', foreignKey: 'fromID'});
    user.hasMany(notification, {as: 'userto',onDelete: 'CASCADE', foreignKey: 'toID'});
}

export default UserDefinition;