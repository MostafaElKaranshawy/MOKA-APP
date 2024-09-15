import {orm, DataTypes } from "../../config/orm.mjs";

const PhotoDefinition = orm.define('photo', {
    url: {
        type: DataTypes.TEXT,
    },
}, {});


PhotoDefinition.associate = async (models) => {
    const {post, photo} = models;
    photo.belongsTo(post, {foreignKey : 'postID'});
}
export default PhotoDefinition;