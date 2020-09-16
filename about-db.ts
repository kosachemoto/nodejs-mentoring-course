import * as pg from 'pg';
import { Sequelize, DataTypes } from 'sequelize';
import { v4 } from 'uuid';

pg.defaults.ssl = true;

const sequelize = new Sequelize({
    host: 'ec2-3-248-4-172.eu-west-1.compute.amazonaws.com',
    database: 'de08k9gc00bhgh',
    username: 'dkaeiiohtypqrd',
    port: 5432,
    password: '8ad6c2d0794ff4ed1a05121c120ffb979934c30466f41eed08d1d8601d04f6b3',
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false
        }
    }
});

const User = sequelize.define('User', {
    id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: v4(),
    },
    login: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    password: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    age: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    isDeleted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    }
}, {
    freezeTableName: true,
    timestamps: false,
});

const kek = User.build({
    login: 'kek',
    password: 'kek123',
    age: 20,
});

kek.save()
    .then((res) => {
        console.log('### success:', res);
    })
    .catch((err) => {
        console.log('### error:', err);
    })

// sequelize.authenticate()
//     .then((...result) => {
//         console.log('### success:', result);
//     })
//     .catch((error) => {
//         console.log('### error:', error);
//     });

export const foo = () => {
    console.log('))0)');
}