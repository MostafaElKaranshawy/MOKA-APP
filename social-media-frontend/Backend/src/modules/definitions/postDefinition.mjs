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
        },
        likes: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        comments: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
    },
    {
        timestamps: true
    }
);

PostDefinition.associate = async (models) => {
    console.log(models);
    const {post, user, comment, postLike, photo} = models;
    post.belongsTo(user, {foreignKey : 'userID'});
    
    post.hasMany(comment, {
        onDelete: 'CASCADE',
        foreignKey: 'postID',
        as: 'postComments' // Use an alias to avoid naming collision
    });
    
    post.hasMany(postLike, {
        onDelete: 'CASCADE',
        foreignKey: 'postID',
        as: 'postLikes' // Use an alias to avoid naming collision
    });
    post.hasMany(photo, {
        onDelete: 'CASCADE',
        foreignKey: 'postID',
        as: 'photos' // Use an alias to avoid naming collision
    });
}

export default PostDefinition;