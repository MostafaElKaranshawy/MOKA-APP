import {orm, DataTypes } from "../config/orm.mjs";

const User = orm.define('user', 
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
        }
    },
    {
        timestamps: false
    }
);




User.associate = async (models) => {
    console.log(models);
    const {user, post, session, friendShip} = models;
    user.hasMany(post, {onDelete : 'CASCADE', foreignKey : 'userID'});
    user.hasMany(session, {onDelete : 'CASCADE', foreignKey : 'userID'});
    user.hasMany(friendShip, { as: 'Friend1', onDelete : 'CASCADE',foreignKey: 'userID'});
    user.hasMany(friendShip, {as: 'Friend2', onDelete: 'CASCADE' ,foreignKey: 'friendID'});
}

export default User;