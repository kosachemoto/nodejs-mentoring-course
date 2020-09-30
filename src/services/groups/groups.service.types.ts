import { NGroupDAL, NGroupDTO } from '@models/group';
import { NUserDTO } from '@models/user';
import { NGroupsDAL } from '@dal/groups';
import { NUserDataMapper } from '@data-mappers/user';

import IUserDataMapper = NUserDataMapper.IUserDataMapper;
import IGroupsDAL = NGroupsDAL.IGroupsDAL;
import IUserDTO = NUserDTO.IUserDTO;
import TGroupDALCreationAttributes = NGroupDAL.TGroupDALCreationAttributes;
import TGroupUpdateAttributes = NGroupsDAL.TGroupUpdateAttributes;
import IGroupDTO = NGroupDTO.IGroupDTO;

export type TGroupCreationData = TGroupDALCreationAttributes; 

export type TGroupUpdateData = TGroupUpdateAttributes;

export interface IGroupsService {
    groupsDAL: IGroupsDAL;
    userDataMapper: IUserDataMapper;

    createGroup: (data: TGroupCreationData) => Promise<IGroupDTO>;
    getGroup: (id: string) => Promise<IGroupDTO>;
    getGroups: () => Promise<IGroupDTO[]>;
    updateGroup: (data: TGroupUpdateData) => Promise<IGroupDTO>;
    deleteGroup: (id: string) => Promise<number>;
    addGroupUsers: (groupId: string, usersIds: string[]) => Promise<number>;
    getGroupUsers: (groupId: string) => Promise<IUserDTO[]>;
}

export interface IGroupsServiceConstructor {
    new(): IGroupsService;
}