import * as UserORMModelTypes from './user.orm-model.types';

export interface IUserAttributes extends UserORMModelTypes.IUserAttributes {}

export type TUserCreationAttributes = IUserAttributes;

export interface IUserDomainModel extends IUserAttributes {}

export interface IUserDomainModelConstructor {
    new(data: TUserCreationAttributes): IUserDomainModel;
}