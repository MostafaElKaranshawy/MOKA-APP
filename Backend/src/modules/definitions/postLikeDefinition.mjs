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
    const {post, postLike} = models;
    postLike.belongsTo(post, {foreignKey : 'postID'});
    
}
export default PostLikeDefinition;