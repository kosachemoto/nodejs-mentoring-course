import { Options } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const {
    DB_HOST,
    DB_DATABASE,
    DB_USERNAME,
    DB_PORT,
    DB_PASSWORD,
    DB_DIALECT,
} = process.env;


export const options: Options = {
    host: DB_HOST,
    database: DB_DATABASE,
    username: DB_USERNAME,
    port: parseInt(DB_PORT || '', 10),
    password: DB_PASSWORD,
    dialect: DB_DIALECT as Options['dialect'],
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false,
        },
    }
};
