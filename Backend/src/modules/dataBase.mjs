import {Sequelize, DataTypes, Op} from "sequelize";
import dotenv from 'dotenv';
dotenv.config();

class DataBase {
    constructor(){
        this.orm = new Sequelize(process.env.DB, process.env.DBuser, process.env.DBpassword,{
            host : process.env.DBhost,
            dialect : 'mysql',
            port : process.env.DBport
        });
        this.User = null;
        this.Post = null;
        this.Comment = null;
        this.PostLike = null;
        this.CommentLike = null;
        this.Session = null;
        this.FriendShip = null;
    }
    async connect(){
        await this.orm.authenticate().then(() => {
            console.log('Connection has been established successfully.');
        }).catch(err => {
            throw new Error('Unable to connect to the database:', err);
        });
        await this.createUserModel();
        await this.createPostModel();
        await this.createCommentModel();
        await this.createPostLikeModel();
        await this.createCommentLikeModel();
        await this.createSessionModel();
        await this.createFriendShipModel();
        await this.setRelations();
        await this.orm.sync();
    }
    async executeQuery(sql, params = []) {
        try {
            const [results, fields] = await this.orm.query(sql, params);
            return results;
        } catch (error) {
            console.error('Error querying the database:', error);
            throw error;
        }
    }
    getORM(){
        return this.orm;
    }
    getOp(){
        return Op;
    }
    async createUserModel(){
        this.User = this.orm.define('User', 
            {
                userID : {
                    type: DataTypes.INTEGER,
                    primaryKey: true,
                    autoIncrement: true
                },
                userName: {
                    type: DataTypes.STRING,
                    allowNull: false,
                    unique: true
                },
                email : {
                    type : DataTypes.STRING,
                    allowNull : false,
                    unique: true,
                },
                password : {
                    type : DataTypes.STRING,
                    allowNull : false,
                },
                name : {
                    type : DataTypes.STRING,
                    allowNull : false,
                }
            },
            {
                timestamps: false
            }
        );
    }
    async createPostModel(){
        this.Post = this.orm.define('Post', 
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
    }
    async createCommentModel(){
        this.Comment = this.orm.define('Comment', 
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
    }
    async createPostLikeModel(){
        this.PostLike = this.orm.define('PostLike', {
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
    }
    async createCommentLikeModel(){
        this.CommentLike = this.orm.define('CommentLike',
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
    }
    async createSessionModel(){
        this.Session = this.orm.define('Session', 
            {
                SessionID : {
                    type: DataTypes.INTEGER,
                    primaryKey: true,
                    autoIncrement: true
                },
                token: {
                    type: DataTypes.TEXT,
                    allowNull: false,
                },
                expiredAt : {
                    type: DataTypes.TIME,
                    allowNull: false
                }
            },
            {
                timestamps: true
            }
        );
    }
    async createFriendShipModel(){
        this.FriendShip = this.orm.define('FriendShip', 
            {
                friendShipID: {
                    type: DataTypes.INTEGER,
                    primaryKey: true,
                    autoIncrement: true
                },
                status: {
                    type: DataTypes.INTEGER,
                    allowNull: false
                }
            },
            {
                timestamps: true
            }
        );
    }
    
    async setRelations(){
        // User
        this.User.hasMany(this.Post, {onDelete : 'CASCADE', foreignKey : 'userID'});
        this.User.hasOne(this.Session, {onDelete : 'CASCADE', foreignKey : 'userID'});
        this.User.hasMany(this.FriendShip, {as: 'Friend1', foreignKey: 'userID'});
        this.User.hasMany(this.FriendShip, {as: 'Friend2', foreignKey: 'friendID'});
    
        // Post
        this.Post.belongsTo(this.User, {foreignKey : 'userID'});
        this.Post.hasMany(this.Comment, {onDelete : 'CASCADE', foreignKey : 'postID'});
        this.Post.hasMany(this.PostLike, {onDelete : 'CASCADE', foreignKey : 'postID'});
    
        // Comment
        this.Comment.belongsTo(this.Post, {foreignKey : 'postID'});
        this.Comment.hasMany(this.CommentLike, {onDelete : 'CASCADE', foreignKey : 'commentID'});
    
        // Post Like
        this.PostLike.belongsTo(this.Post, {foreignKey : 'postID'});
    
        // Comment Like
        this.CommentLike.belongsTo(this.Comment, {foreignKey : 'commentID'});
    
        // Session
        this.Session.belongsTo(this.User, {foreignKey : 'userID'});
    
        // FriendShip
        this.FriendShip.belongsTo(this.User, {as: 'Friend1', foreignKey: 'userID'});
        this.FriendShip.belongsTo(this.User, {as: 'Friend2', foreignKey: 'friendID'});
    }
}
export default DataBase;