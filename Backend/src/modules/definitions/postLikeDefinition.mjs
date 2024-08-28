import {orm, DataTypes } from "../../config/orm.mjs";

const PostLikeDefinition = orm.define('postLike', {
    postLikeID : {
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



PostLikeDefinition.associate = async (models) => {
    const {post, postLike, user} = models;
    postLike.belongsTo(post, {foreignKey : 'postID'});
    postLike.belongsTo(user, {foreignKey : 'userID'});
    
}
export default PostLikeDefinition;