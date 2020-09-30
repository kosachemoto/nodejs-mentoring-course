import "reflect-metadata";
import { injectable, inject } from 'inversify';
import { TYPE } from '@ioc/inversify.types';
import { NGroupDAL } from '@models/group';
import { IGroupsDAL } from './groups.dal.types';

import TGroupDAL = NGroupDAL.TGroupDAL;
import TGroupDALDefined = NGroupDAL.TGroupDALDefined;
import { Sequelize } from "sequelize";

@injectable()
export class GroupsDAL implements IGroupsDAL {
    groupModel: TGroupDALDefined;
    sequelize: Sequelize;

    constructor(
        @inject(TYPE.ORM.SEQUELIZE) sequelize: Sequelize,
        @inject(TYPE.MODEL.DAL.GROUP) groupModel: TGroupDALDefined,
    ) {
        this.sequelize = sequelize;
        this.groupModel = groupModel;
    }

    createGroup: IGroupsDAL['createGroup'] = async (creationData) => {
        return this.groupModel.create(creationData) as Promise<TGroupDAL>;
    }

    getGroup: IGroupsDAL['getGroup'] = async (id) => {
        return this.groupModel.findByPk(id) as Promise<TGroupDAL>;
    }

    getGroups: IGroupsDAL['getGroups'] = async () => {
        return this.groupModel.findAll() as Promise<TGroupDAL[]>;
    }

    updateGroup: IGroupsDAL['updateGroup'] = async (data) => {
        return this.groupModel.update(data, {
            fields: ['name', 'permissions'],
            where: {
                id: data.id
            }
        }) as Promise<[number, TGroupDAL[]]>;
    }

    deleteGroup: IGroupsDAL['deleteGroup'] = async (id) => {
        return this.groupModel.destroy({
            where: {
                id,
            },
            truncate: true,
        });
    }

    addGroupUsers: IGroupsDAL['addGroupUsers'] = async (groupId, usersIds) => {
        const  transaction = await this.sequelize.transaction();

        try {
            const group = await this.groupModel.findByPk(groupId, { transaction }).then((group) => {
                if (!group) {
                    throw new Error('Group does not exist.')
                }

                return group;
            });

            const status = await (group as any).addUsers(usersIds, { transaction }).then(([ status ]: [ number ]) => {
                return status;
            })

            await transaction.commit();

            return status;

        } catch (error) {
            await transaction.rollback();

            throw error;
        }
    }

    getGroupUsers: IGroupsDAL['getGroupUsers'] = async (groupId) => {
        return this.groupModel.findByPk(groupId).then((group) => {
            if (!group) {
                throw new Error('Group does not exist.');
            }

            return (group as any).getUsers();
        }).then((result) => {
            return result;
        });
    }
}