import {
    NUserDAL,
    NUserDTO,
} from '@models/user';
import { NUserDataMapper } from '@data-mappers/user';
import { NUsersDAL } from '@dal/users';

import IUserDataMapper = NUserDataMapper.IUserDataMapper;
import TUserUpdateAttributes = NUsersDAL.TUserUpdateAttributes;
import IUsersDAL = NUsersDAL.IUsersDAL;
import TUserDALCreationAttributes = NUserDAL.TUserDALCreationAttributes;
import IUserDTO = NUserDTO.IUserDTO;

export type TUserCreationData = TUserDALCreationAttributes;
export type TUserUpdateData = TUserUpdateAttributes;
export type TGetUserById = (id: string) => Promise<IUserDTO>;
export type TGetUserByCredentials = (login: string, password: string) => Promise<IUserDTO>;

export interface IUsersService {
    usersDAL: IUsersDAL;
    userDataMapper: IUserDataMapper;

    createUser: (data: TUserCreationData) => Promise<IUserDTO>;
    getUser: {
        byId: TGetUserById;
        byCredentials: TGetUserByCredentials;
    };
    getUsers: (loginSubstring?: string, limit?: number) => Promise<IUserDTO[]>;
    updateUser: (data: TUserUpdateData) => Promise<IUserDTO>;
    deleteUser: (id: string) => Promise<number>;
}

export interface IUsersServiceConstructor {
    new(usersDAL: IUsersDAL, userDataMapper: IUserDataMapper): IUsersService;
}