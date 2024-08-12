import {orm, DataTypes } from "../config/orm.mjs";

const Session = orm.define('session', 
    {
        SessionID : {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        token: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        expiredAt : {
            type: DataTypes.TIME,
            allowNull: false
        }
    },
    {
        timestamps: true
    }
);

Session.associate = async (models) =>{
    const {user, session} = models;
    session.belongsTo(user, {foreignKey : 'userID'});
}
export default Session;