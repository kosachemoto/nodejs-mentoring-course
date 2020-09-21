import { Model, ModelDefined } from 'sequelize';

export interface IUserDALAttributes {
    id: string;
    login: string;
    password: string;
    age: number;
    isDeleted: boolean;
}

export type TUserDALCreationAttributes = Pick<IUserDALAttributes, 'login' | 'password' | 'age'>

export type TUserDAL = Model<IUserDALAttributes, TUserDALCreationAttributes> & IUserDALAttributes;

export type TUserDALDefined = ModelDefined<IUserDALAttributes, TUserDALCreationAttributes>;