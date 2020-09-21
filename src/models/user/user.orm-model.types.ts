import { Model, ModelDefined } from 'sequelize';

export interface IUserAttributes {
    id: string;
    login: string;
    password: string;
    age: number;
    isDeleted: boolean;
}

export type TUserCreationAttributes = Pick<IUserAttributes, 'login' | 'password' | 'age'>

export type TUserORMModel = Model<IUserAttributes, TUserCreationAttributes> & IUserAttributes;

export type TUserDefinedORMModel = ModelDefined<IUserAttributes, TUserCreationAttributes>;

// Promise<Model<IUserAttributes, Pick<IUserAttributes, "login" | "password" | "age">>[]>