import { NGroupDAL } from '../dal';

import TGroupPermissions = NGroupDAL.TGroupPermissions;

export interface IGroupDTO {
    id: string;
    name: string;
    permissions: Array<TGroupPermissions>;
}

export type TGroupDTOCreationData = IGroupDTO;

export interface IUserDTOConstructor {
    new(data: TGroupDTOCreationData): IGroupDTO;
}