import {orm, DataTypes } from "../../config/orm.mjs";

const SessionDefinition = orm.define('session', 
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

SessionDefinition.associate = async (models) =>{
    const {user, session} = models;
    session.belongsTo(user, {foreignKey : 'userID'});
}
export default SessionDefinition;