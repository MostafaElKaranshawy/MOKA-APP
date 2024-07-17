import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

class DataBase {
    constructor() {
        this.connection = null;
    }

    async connectDataBase() {
        try {
            this.connection = await mysql.createConnection({
                host: process.env.DBhost,
                user: process.env.DBuser,
                password: process.env.DBpassword,
                database: process.env.DB
            });
        } catch (error) {
            console.error('Error connecting to MySQL database:', error);
        }
    }

    async executeQuery(sql, params = []) {
        try {
            const [results, fields] = await this.connection.execute(sql, params);
            return results;
        } catch (error) {
            console.error('Error querying the database:', error);
            throw error;
        }
    }

    async closeConnection() {
        try {
            if (this.connection) {
                await this.connection.end();
            }
        } catch (error) {
            console.error('Error closing the database connection:', error);
        }
    }
}

export default DataBase;