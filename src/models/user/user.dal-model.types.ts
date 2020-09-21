import * as UserORMModelTypes from './user.orm-model.types';

export interface IUserAttributes extends UserORMModelTypes.IUserAttributes {}

export type TUserCreationAttributes = IUserAttributes;

export interface IUserDALModel extends IUserAttributes {}

export interface IUserDALModelConstructor {
    new(data: TUserCreationAttributes): IUserDALModel;
}