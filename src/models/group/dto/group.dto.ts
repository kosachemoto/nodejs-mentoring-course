import { NGroupDAL } from '../dal';
import { IGroupDTO, TGroupDTOCreationData } from './group.dto.types';

import TGroupPermissions = NGroupDAL.TGroupPermissions;

export class GroupDTO implements IGroupDTO {
    id: string;
    name: string;
    permissions: Array<TGroupPermissions>;

    constructor({
        id,
        name,
        permissions,
    }: TGroupDTOCreationData) {
        this.id = id;
        this.name = name;
        this.permissions = permissions;
    }
}