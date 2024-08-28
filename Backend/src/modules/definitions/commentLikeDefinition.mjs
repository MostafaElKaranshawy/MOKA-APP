import {orm, DataTypes } from "../../config/orm.mjs";

const CommentLikeDefinition = orm.define('commentLike',
    {
        commentLikeID : {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        userID : {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },
    {
        timestamps: true
    }
);
export default CommentLikeDefinition;

CommentLikeDefinition.associate = async (models) => {
    const {comment, commentLike, user} = models;
    commentLike.belongsTo(comment, {foreignKey : 'commentID'});
    commentLike.belongsTo(user, {foreignKey : 'userID'});
}