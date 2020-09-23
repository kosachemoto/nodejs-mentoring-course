import 'reflect-metadata';
import { inject, injectable } from 'inversify';
import { IGroupsService } from './groups.service.types';
import { TYPE } from '@ioc/inversify.types';
import { NGroupsDAL } from '@dal/groups';
import { UserDoesNotExist } from 'src/utils';

import IGroupsDAL = NGroupsDAL.IGroupsDAL;

// TODO: Поменять ошибки
@injectable()
export class GroupsService implements IGroupsService {
    groupsDAL: IGroupsDAL;

    constructor(
        @inject(TYPE.DAL.GROUPS) groupsDAL: IGroupsDAL,
    ) {
        this.groupsDAL = groupsDAL;
    }

    createGroup: IGroupsService['createGroup'] = async (data) => {
        return this.groupsDAL.createGroup(data);
    }

    getGroup: IGroupsService['getGroup'] = async (id) => {
        return this.groupsDAL.getGroup(id).then(([ group ]) => group);
    }

    getGroups: IGroupsService['getGroups'] = async () => {
        return this.groupsDAL.getGroups();
    }

    updateGroup: IGroupsService['updateGroup'] = async (data) => {
        const { id } = data;

        return this.groupsDAL.updateGroup(data).then(([ status ]) => {
                if (!status) {
                    throw new UserDoesNotExist();
                }

                return this.groupsDAL.getGroup(id)
            }).then(([ group ]) => {
                if (!group) {
                    throw new UserDoesNotExist();
                }

                return group;
            });
    }

    deleteGroup: IGroupsService['deleteGroup'] = async (id) => {
        return this.groupsDAL.deleteGroup(id);
    }
}
