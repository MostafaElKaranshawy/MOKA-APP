import {orm, DataTypes } from "../../config/orm.mjs";


const PostDefinition = orm.define('post', 
    {
        postID : {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        }
    },
    {
        timestamps: true
    }
);



PostDefinition.associate = async (models) => {
    const {post, user, comment, postLike} = models;
    post.belongsTo(user, {foreignKey : 'userID'});
    post.hasMany(comment, {onDelete : 'CASCADE', foreignKey : 'postID'});
    post.hasMany(postLike, {onDelete : 'CASCADE', foreignKey : 'postID'});
}

export default PostDefinition;