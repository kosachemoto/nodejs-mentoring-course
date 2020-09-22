import {
    NUserDAL,
    NUserDomain,
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
    getUsers: () => Promise<IUserDTO[]>;
    updateUser: (data: TUserUpdateData) => Promise<[number, IUserDTO[]]>;
    deleteUser: (id: string) => Promise<[number, IUserDTO[]]>;
    getAutoSuggestUsers: (loginSubstring: string, limit?: number) => any[];
}

export interface IUsersServiceConstructor {
    new(usersDAL: IUsersDAL): IUsersService;
}

// export type CreationData = TUserCreationAttributes;

// export interface ServiceMethods {
//     createUser: (data: CreationData) => Promise<IUserDomainModel>;
//     getUser: (id: string) => Promise<IUserDomainModel>;
//     getUsers: () => Promise<IUserDomainModel[]>;
//     updateUser: (data: TUserUpdateAttributes) => Promise<[number, IUserDomainModel[]]>;
//     deleteUser: (id: string) => Promise<[number, IUserDomainModel[]]>;
//     getAutoSuggestUsers: (loginSubstring: string, limit?: number) => User[];
// }

// export interface Service extends ServiceMethods {
//     users: User[];
//     usersRepository: IUserRepository;
// }
