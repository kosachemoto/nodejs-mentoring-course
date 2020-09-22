import {
    NUserDAL,
    NUserDTO,
} from '@models/user';
import { NUsersDAL } from '@dal/users';

import TUserUpdateAttributes = NUsersDAL.TUserUpdateAttributes;
import IUsersDAL = NUsersDAL.IUsersDAL;
import TUserDALCreationAttributes = NUserDAL.TUserDALCreationAttributes;
import IUserDTO = NUserDTO.IUserDTO;

export type TUserCreationData = TUserDALCreationAttributes;

export type TUserUpdateData = TUserUpdateAttributes;

export interface IUsersService {
    usersDAL: IUsersDAL;

    createUser: (data: TUserCreationData) => Promise<IUserDTO>;
    getUser: (id: string) => Promise<IUserDTO>;
    getUsers: (loginSubstring?: string, limit?: number) => Promise<IUserDTO[]>;
    updateUser: (data: TUserUpdateData) => Promise<[number, IUserDTO[]]>;
    deleteUser: (id: string) => Promise<[number, IUserDTO[]]>;
}

export interface IUsersServiceConstructor {
    new(usersDAL: IUsersDAL): IUsersService;
}