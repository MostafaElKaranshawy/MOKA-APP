import {Sequelize, DataTypes, Op} from "sequelize";
import dotenv from 'dotenv';
dotenv.config();

const orm = new Sequelize(process.env.DB, process.env.DBuser, process.env.DBpassword,{
    host : process.env.DBhost,
    dialect : 'mysql',
    port : process.env.DBport
});

export{
    orm,
    DataTypes,
    Op
}