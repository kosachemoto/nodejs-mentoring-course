import { UserDomainModelTypes, UserORMModelTypes } from 'src/models/user';
import { NUserRepository } from 'src/repositories/users';
import { UsersDALTypes } from 'src/dal/users';

import TUserUpdateAttributes = UsersDALTypes.TUserUpdateAttributes;
import IUserRepository = NUserRepository.IUserRepository;
import IUserDomainModel = UserDomainModelTypes.IUserDomainModel;
import TUserCreationAttributes = UserORMModelTypes.TUserCreationAttributes;

export type User = {
    id: string;
    login: string;
    password: string;
    age: number;
    isDeleted: boolean;
}

export type CreationData = TUserCreationAttributes;

export interface ServiceMethods {
    createUser: (data: CreationData) => Promise<IUserDomainModel>;
    getUser: (id: string) => Promise<IUserDomainModel>;
    getUsers: () => Promise<IUserDomainModel[]>;
    updateUser: (data: TUserUpdateAttributes) => Promise<[number, IUserDomainModel[]]>;
    deleteUser: (id: string) => Promise<[number, IUserDomainModel[]]>;
    getAutoSuggestUsers: (loginSubstring: string, limit?: number) => User[];
}

export interface Service extends ServiceMethods {
    users: User[];
    usersRepository: IUserRepository;
}
