import { UserORMModelTypes, UserDALModelTypes, UserDomainModelTypes } from '@root/src/models/user';
import { UsersDALTypes } from 'src/dal/users';

import IUserAttributes = UserORMModelTypes.IUserAttributes;
import TUserUpdateAttributes = UsersDALTypes.TUserUpdateAttributes;
import TUserCreationAttributes = UserORMModelTypes.TUserCreationAttributes;
import IUserDomainModel = UserDomainModelTypes.IUserDomainModel;

export interface IUserRepository {
    createUser: (data: TUserCreationAttributes) => Promise<IUserDomainModel>;
    getUser: (id: IUserAttributes['id']) => Promise<IUserDomainModel[]>;
    getUsers: () => Promise<IUserDomainModel[]>;
    updateUser: (data: TUserUpdateAttributes) => Promise<[number, IUserDomainModel[]]>;
    deleteUser: (id: IUserAttributes['id']) => Promise<[number, IUserDomainModel[]]>;
}

export interface IUserRepositoryConstructor {
    new(): IUserRepository;
}