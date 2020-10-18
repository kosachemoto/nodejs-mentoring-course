import { Model, ModelDefined, Sequelize, DataTypes, ModelCtor } from 'sequelize';

export interface IUserDALAttributes {
    id: string;
    login: string;
    password: string;
    age: number;
    isDeleted: boolean;
    refreshToken: string;
}

export type TUserDALCreationAttributes = Pick<IUserDALAttributes, 'login' | 'password' | 'age'>

export type TUserDAL = Model<IUserDALAttributes, TUserDALCreationAttributes> & IUserDALAttributes;

export type TUserDALDefined = ModelDefined<IUserDALAttributes, TUserDALCreationAttributes>;

export interface IUserDAL extends ModelCtor<TUserDAL> {};

export interface IUserDALConstructor {
    new(sequelize: Sequelize, dataTypes: typeof DataTypes): IUserDAL;
}

// @inject(TYPE.ORM.SEQUELIZE) sequelize: Sequelize,
// @inject(TYPE.ORM.DATA_TYPES) dataTypes: typeof DataTypes,