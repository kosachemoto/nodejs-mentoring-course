export interface IUserDomain {
    id: string;
    login: string;
    password: string;
    age: number;
    isDeleted: boolean;
}

export type TUserDomainCreationData = IUserDomain;

export interface IUserDomainConstructor {
    new(data: TUserDomainCreationData): IUserDomain;
}

// import * as UserORMModelTypes from './user.orm-model.types';

// export interface IUserAttributes extends UserORMModelTypes.IUserAttributes {}

// export type TUserCreationAttributes = IUserAttributes;

// export interface IUserDomainModel extends IUserAttributes {}

// export interface IUserDomainModelConstructor {
//     new(data: TUserCreationAttributes): IUserDomainModel;
// }