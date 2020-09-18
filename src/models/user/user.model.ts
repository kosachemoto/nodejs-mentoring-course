import { TYPES } from '@root/inversify.types';
import { container } from '@root/inversify.config';

import { DataTypes, Sequelize } from 'sequelize';
import { v4 } from 'uuid';

const sequelize = container.get<Sequelize>(TYPES.ORM.SEQUELIZE);

export const User = sequelize.define('User', {
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
    timestamps: false,
});