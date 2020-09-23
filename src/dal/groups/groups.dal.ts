import "reflect-metadata";
import { injectable, inject } from 'inversify';
import { TYPE } from '@ioc/inversify.types';
import { NGroupDAL } from '@models/group';
import { IGroupsDAL } from './groups.dal.types';

import TGroupDAL = NGroupDAL.TGroupDAL;
import TGroupDALDefined = NGroupDAL.TGroupDALDefined;

@injectable()
export class GroupsDAL implements IGroupsDAL {
    groupModel: TGroupDALDefined;

    constructor(
        @inject(TYPE.MODEL.DAL.GROUP) groupModel: TGroupDALDefined,
    ) {
        this.groupModel = groupModel;
    }

    createGroup: IGroupsDAL['createGroup'] = async (creationData) => {
        return this.groupModel.create(creationData) as Promise<TGroupDAL>;
    }

    getGroup: IGroupsDAL['getGroup'] = async (id) => {
        return this.groupModel.findAll({
            where: {
                id,
            }
        }) as Promise<TGroupDAL[]>;
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
}