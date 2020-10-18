import 'reflect-metadata';
import { injectable, inject, } from 'inversify';
import { DataTypes, Sequelize } from 'sequelize';
import { v4 } from 'uuid';
import { TYPE } from '@ioc/inversify.types';
import { TUserDAL } from './user.dal.types';

@injectable()
export class UserDAL {
    constructor(
        @inject(TYPE.ORM.SEQUELIZE) sequelize: Sequelize,
        @inject(TYPE.ORM.DATA_TYPES) dataTypes: typeof DataTypes,
    ) {
        const User = sequelize.define<TUserDAL>('User', {
            id: {
                type: dataTypes.UUID,
                allowNull: false,
                primaryKey: true,
                defaultValue: v4(),
            },
            login: {
                type: dataTypes.TEXT,
                allowNull: false
            },
            password: {
                type: dataTypes.TEXT,
                allowNull: false,
            },
            age: {
                type: dataTypes.INTEGER,
                allowNull: false
            },
            isDeleted: {
                type: dataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
            refreshToken: {
                type: dataTypes.TEXT,
                defaultValue: null
            }
        }, {
            timestamps: false,
        });

        return User;
    }
}