import { NUserDAL } from '@models/user';

import TUserDAL = NUserDAL.TUserDAL;
import TUserDALDefined = NUserDAL.TUserDALDefined;
import IUserDALAttributes = NUserDAL.IUserDALAttributes;
import TUserDALCreationAttributes = NUserDAL.TUserDALCreationAttributes;

export type TUserUpdateAttributes = Pick<IUserDALAttributes, 'id'> & Partial<Omit<IUserDALAttributes, 'isDeleted'>>;
export type TGetUserById = (id: string) => Promise<TUserDAL[]>;
export type TGetUserByCredentials = (login: string, password: string) => Promise<TUserDAL[]>;
export type TUpdateRefreshToken = Pick<IUserDALAttributes, 'id' | 'refreshToken'>;

export interface IUsersDAL {
    createUser: (data: TUserDALCreationAttributes) => Promise<TUserDAL>;
    getUser: {
        byId: TGetUserById;
        byCredentials: TGetUserByCredentials;
    };
    getUsers: (limit?: number) => Promise<TUserDAL[]>;
    updateUser: (data: TUserUpdateAttributes) => Promise<[number, TUserDAL[]]>;
    deleteUser: (id: IUserDALAttributes['id']) => Promise<[number, TUserDAL[]]>;
    updateRefreshToken: (data: TUpdateRefreshToken) => Promise<[number, TUserDAL[]]>;
}

export interface IDALConstructor {
    new(userModel: TUserDALDefined): IUsersDAL;
}