import 'reflect-metadata';
import { injectable, inject } from 'inversify';
import { TYPES } from '@root/inversify.types';
import { DataTypes, Sequelize } from 'sequelize';
import { v4 } from 'uuid';
import { TUserORMModel } from './user.orm-model.types';

@injectable()
export class UserORMModel {
    constructor(
        @inject(TYPES.ORM.SEQUELIZE) sequelize: Sequelize,
        @inject(TYPES.ORM.DATA_TYPES) dataTypes: typeof DataTypes,
    ) {
        const User = sequelize.define<TUserORMModel>('User', {
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
            }
        }, {
            timestamps: false,
        });

        return User;
    }
}