import {orm, DataTypes } from "../config/orm.mjs";

const Comment = orm.define('comment', 
    {
        commentID : {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        userID : {
            type: DataTypes.INTEGER,
            allowNull: false
        },
    },
    {
        timestamps: true
    }
);

export default Comment;

Comment.associate = async (models) => {
    const {post,comment ,commentLike} = models;
    comment.belongsTo(post, {foreignKey : 'postID'});
    comment.hasMany(commentLike, {onDelete : 'CASCADE', foreignKey : 'commentID'});
}