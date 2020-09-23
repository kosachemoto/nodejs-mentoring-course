import { NGroupDAL } from '@models/group';

import TGroupDAL = NGroupDAL.TGroupDAL;
import TGroupDALDefined = NGroupDAL.TGroupDALDefined;
import IGroupDALAttributes = NGroupDAL.IGroupDALAttributes;
import TGroupDALCreationAttributes = NGroupDAL.TGroupDALCreationAttributes;

export type TGroupUpdateAttributes = Pick<IGroupDALAttributes, 'id'> & Partial<Omit<IGroupDALAttributes, 'isDeleted'>>;

export interface IGroupsDAL {
    createGroup: (data: TGroupDALCreationAttributes) => Promise<TGroupDAL>;
    getGroup: (id: IGroupDALAttributes['id']) => Promise<TGroupDAL[]>;
    getGroups: (limit?: number) => Promise<TGroupDAL[]>;
    updateGroup: (data: TGroupUpdateAttributes) => Promise<[number, TGroupDAL[]]>;
    deleteGroup: (id: IGroupDALAttributes['id']) => Promise<number>;
}

export interface IGroupsDALConstructor {
    new(groupModel: TGroupDALDefined): IGroupsDAL;
}