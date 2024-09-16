import {orm, DataTypes } from "../../config/orm.mjs";

const MediaDefinition = orm.define('media', {
    url: {
        type: DataTypes.TEXT,
    },
    type: {
        type: DataTypes.TEXT,
    },
}, {});


MediaDefinition.associate = async (models) => {
    const {post, media} = models;
    media.belongsTo(post, {foreignKey : 'postID'});
}
export default MediaDefinition;