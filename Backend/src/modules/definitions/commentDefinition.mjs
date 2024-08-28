import {orm, DataTypes } from "../../config/orm.mjs";

const CommentDefinition = orm.define('comment', 
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
        likes: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
    },
    {
        timestamps: true
    }
);


CommentDefinition.associate = async (models) => {
    const {post,comment ,commentLike, user} = models;
    comment.belongsTo(user, {foreignKey : 'userID'});
    comment.belongsTo(post, {foreignKey : 'postID'});
    comment.hasMany(commentLike, {onDelete : 'CASCADE', foreignKey : 'commentID'});
}
export default CommentDefinition;