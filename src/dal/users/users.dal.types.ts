import { NUserDAL } from '@models/user';

import TUserDAL = NUserDAL.TUserDAL;
import TUserDALDefined = NUserDAL.TUserDALDefined;
import IUserDALAttributes = NUserDAL.IUserDALAttributes;
import TUserDALCreationAttributes = NUserDAL.TUserDALCreationAttributes;

export type TUserUpdateAttributes = Pick<IUserDALAttributes, 'id'> & Partial<Omit<IUserDALAttributes, 'isDeleted'>>;

export interface IUsersDAL {
    createUser: (data: TUserDALCreationAttributes) => Promise<TUserDAL>;
    getUser: (id: IUserDALAttributes['id']) => Promise<TUserDAL[]>;
    getUsers: (limit?: number) => Promise<TUserDAL[]>;
    updateUser: (data: TUserUpdateAttributes) => Promise<[number, TUserDAL[]]>;
    deleteUser: (id: IUserDALAttributes['id']) => Promise<[number, TUserDAL[]]>;
}

export interface IDALConstructor {
    new(userModel: TUserDALDefined): IUsersDAL;
}