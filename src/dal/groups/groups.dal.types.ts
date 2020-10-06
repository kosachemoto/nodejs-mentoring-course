import { NGroupDAL } from '@models/group';
import { NUserDAL } from '@models/user';
import { Sequelize } from 'sequelize';

import TUserDAL = NUserDAL.TUserDAL;
import TGroupDAL = NGroupDAL.TGroupDAL;
import TGroupDALDefined = NGroupDAL.TGroupDALDefined;
import IGroupDALAttributes = NGroupDAL.IGroupDALAttributes;
import TGroupDALCreationAttributes = NGroupDAL.TGroupDALCreationAttributes;

export type TGroupUpdateAttributes = Pick<IGroupDALAttributes, 'id'> & Partial<Omit<IGroupDALAttributes, 'isDeleted'>>;

export interface IGroupsDAL {
    groupModel: TGroupDALDefined;
    sequelize: Sequelize;

    createGroup: (data: TGroupDALCreationAttributes) => Promise<TGroupDAL>;
    getGroup: (id: IGroupDALAttributes['id']) => Promise<TGroupDAL>;
    getGroups: (limit?: number) => Promise<TGroupDAL[]>;
    updateGroup: (data: TGroupUpdateAttributes) => Promise<[number, TGroupDAL[]]>;
    deleteGroup: (id: IGroupDALAttributes['id']) => Promise<number>;
    addGroupUsers: (groupId: IGroupDALAttributes['id'], usersIds: TUserDAL['id'][]) => Promise<number>;
    getGroupUsers: (groupId: IGroupDALAttributes['id']) => Promise<TUserDAL[]>;
}

export interface IGroupsDALConstructor {
    new(groupModel: TGroupDALDefined): IGroupsDAL;
}