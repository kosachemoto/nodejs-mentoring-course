import 'reflect-metadata';
import { injectable, inject } from 'inversify';
import { DataTypes, Sequelize } from 'sequelize';
import { v4 } from 'uuid';
import { TYPE } from '@ioc/inversify.types';
import { TGroupDAL } from './group.dal.types';

@injectable()
export class GroupDAL {
    constructor(
        @inject(TYPE.ORM.SEQUELIZE) sequelize: Sequelize,
        @inject(TYPE.ORM.DATA_TYPES) dataTypes: typeof DataTypes,
    ) {
        const Group = sequelize.define<TGroupDAL>('Group', {
            id: {
                type: dataTypes.UUID,
                allowNull: false,
                primaryKey: true,
                defaultValue: v4(),
            },
            name: {
                type: dataTypes.STRING,
                allowNull: false,
            },
            permissions: {
                type: dataTypes.STRING,
                allowNull: false,
            },
        }, {
            timestamps: false,
        });

        return Group;
    }
}