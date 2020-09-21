import "reflect-metadata";
import { injectable, inject } from 'inversify';
import { TYPES } from '@root/inversify.types';
import { UserORMModelTypes } from 'src/models/user';
import { UsersDALTypes } from ".";

import TUserDefinedORMModel = UserORMModelTypes.TUserDefinedORMModel;
import IUserAttributes = UserORMModelTypes.IUserAttributes;
import { TUserORMModel } from "@root/src/models/user/user.orm-model.types";

// TODO: Поправить возвращаеые типы методов
@injectable()
export class UsersDAL implements UsersDALTypes.DAL {
    userORMModel: TUserDefinedORMModel;

    constructor(
        @inject(TYPES.MODELS.ORM.USER) userORMModel: TUserDefinedORMModel,
    ) {
        this.userORMModel = userORMModel;
    }

    createUser: UsersDALTypes.DAL['createUser'] = async (creationData) => {
        return this.userORMModel.create(creationData) as Promise<TUserORMModel>;
    }

    getUser: UsersDALTypes.DAL['getUser'] = async (id) => {
        return this.userORMModel.findAll({
            where: {
                id,
            }
        }) as Promise<TUserORMModel[]>;
    }

    getUsers: UsersDALTypes.DAL['getUsers'] = async () => {
        return this.userORMModel.findAll() as Promise<TUserORMModel[]>;
    }

    // TODO: Поменять тип
    updateUser: UsersDALTypes.DAL['updateUser'] = async (data) => {
        return this.userORMModel.update(data, {
            fields: ['login', 'password', 'age'],
            where: {
                id: data.id
            }
        }) as Promise<[number, TUserORMModel[]]>
    }

    deleteUser: UsersDALTypes.DAL['deleteUser'] = async (id: string) => {
        return this.userORMModel.update({ isDeleted: true }, {
            fields: ['isDeleted'],
            where: {
                id,
            }
        }) as Promise<[number, TUserORMModel[]]>
    }
}