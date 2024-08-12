import {orm, DataTypes } from "../config/orm.mjs";


const Post = orm.define('post', 
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



Post.associate = async (models) => {
    const {user, comment, postLike} = models;
    Post.belongsTo(user, {foreignKey : 'userID'});
    Post.hasMany(comment, {onDelete : 'CASCADE', foreignKey : 'postID'});
    Post.hasMany(postLike, {onDelete : 'CASCADE', foreignKey : 'postID'});
}

export default Post;