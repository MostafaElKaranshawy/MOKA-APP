import {orm, DataTypes } from "../config/orm.mjs";

const CommentLike = orm.define('commentLike',
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
export default CommentLike;

CommentLike.associate = async (models) => {
    const {comment, commentLike} = models;
    commentLike.belongsTo(comment, {foreignKey : 'commentID'});
}

// CommentLike.addHook('afterDefine', (model) => {
//     // Set up the association here
//     model.belongsTo(Comment, { foreignKey: 'commentID' });
// });
// CommentLike.belongsTo(Comment, {foreignKey : 'commentID'});