import { NGroupDAL, NGroupDTO } from '@models/group';
import { NGroupsDAL } from '@dal/groups';

import TGroupDALCreationAttributes = NGroupDAL.TGroupDALCreationAttributes;
import TGroupUpdateAttributes = NGroupsDAL.TGroupUpdateAttributes;
import IGroupDTO = NGroupDTO.IGroupDTO;

export type TGroupCreationData = TGroupDALCreationAttributes; 

export type TGroupUpdateData = TGroupUpdateAttributes;

export interface IGroupsService {
    createGroup: (data: TGroupCreationData) => Promise<IGroupDTO>;
    getGroup: (id: string) => Promise<IGroupDTO>;
    getGroups: () => Promise<IGroupDTO[]>;
    updateGroup: (data: TGroupUpdateData) => Promise<IGroupDTO>;
    deleteGroup: (id: string) => Promise<number>;
}

export interface IGroupsServiceConstructor {
    new(): IGroupsService;
}