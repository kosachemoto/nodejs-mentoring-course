import 'reflect-metadata';
import { inject, injectable } from 'inversify';
import { IGroupsService } from './groups.service.types';
import { TYPE } from '@ioc/inversify.types';
import { NGroupsDAL } from '@dal/groups';
import { NUserDataMapper } from '@data-mappers/user';
import { UserDoesNotExist } from 'src/utils';

import IUserDataMapper = NUserDataMapper.IUserDataMapper;
import IGroupsDAL = NGroupsDAL.IGroupsDAL;

// TODO: Поменять ошибки
@injectable()
export class GroupsService implements IGroupsService {
    groupsDAL: IGroupsDAL;
    userDataMapper: IUserDataMapper;

    constructor(
        @inject(TYPE.DAL.GROUPS) groupsDAL: IGroupsDAL,
        @inject(TYPE.DATA_MAPPER.USER) userDataMapper: IUserDataMapper,
    ) {
        this.groupsDAL = groupsDAL;
        this.userDataMapper = userDataMapper;
    }

    createGroup: IGroupsService['createGroup'] = async (data) => {
        return this.groupsDAL.createGroup(data);
    }

    getGroup: IGroupsService['getGroup'] = async (id) => {
        return this.groupsDAL.getGroup(id);
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
            }).then((group) => {
                if (!group) {
                    throw new UserDoesNotExist();
                }

                return group;
            });
    }

    deleteGroup: IGroupsService['deleteGroup'] = async (id) => {
        return this.groupsDAL.deleteGroup(id);
    }
    
    addGroupUsers: IGroupsService['addGroupUsers'] = async (groupId, usersIds) => {
        return this.groupsDAL.addGroupUsers(groupId, usersIds);
    }

    getGroupUsers: IGroupsService['getGroupUsers'] = async (groupId) => {
        return this.groupsDAL.getGroupUsers(groupId).then((users) => {
            return users.map((user) => this.userDataMapper.toDTO(user));
        });
    }
}
