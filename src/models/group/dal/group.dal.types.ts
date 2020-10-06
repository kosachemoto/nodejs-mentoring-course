import { Model, ModelDefined, Sequelize, DataTypes, ModelCtor } from 'sequelize';

export type TGroupPermissions = 'READ' | 'WRITE' | 'DELETE' | 'SHARE' | 'UPLOAD_FILES';

export interface IGroupDALAttributes {
    id: string;
    name: string;
    permissions: Array<TGroupPermissions>;
}

export type TGroupDALCreationAttributes = IGroupDALAttributes;

export type TGroupDAL = Model<IGroupDALAttributes, TGroupDALCreationAttributes> & IGroupDALAttributes;

export type TGroupDALDefined = ModelDefined<IGroupDALAttributes, TGroupDALCreationAttributes>;

export interface IGroupDAL extends ModelCtor<TGroupDAL> {};

export interface IGroupDALConstructor {
    new(sequelize: Sequelize, dataTypes: typeof DataTypes): IGroupDAL;
}

// @inject(TYPE.ORM.SEQUELIZE) sequelize: Sequelize,
// @inject(TYPE.ORM.DATA_TYPES) dataTypes: typeof DataTypes,