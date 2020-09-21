import { UserORMModelTypes } from '@root/src/models/user';

import TUserORMModel = UserORMModelTypes.TUserORMModel;
import IUserAttributes = UserORMModelTypes.IUserAttributes;
import TUserCreationAttributes = UserORMModelTypes.TUserCreationAttributes;

export type TUserUpdateAttributes = Pick<IUserAttributes, 'id'> & Partial<Omit<IUserAttributes, 'isDeleted'>>;

export interface DALMethods {
    createUser: (data: TUserCreationAttributes) => Promise<TUserORMModel>;
    getUser: (id: IUserAttributes['id']) => Promise<TUserORMModel[]>;
    getUsers: () => Promise<TUserORMModel[]>;
    updateUser: (data: TUserUpdateAttributes) => Promise<[number, TUserORMModel[]]>;
    deleteUser: (id: IUserAttributes['id']) => Promise<[number, TUserORMModel[]]>;
}

export interface DAL extends DALMethods {

}