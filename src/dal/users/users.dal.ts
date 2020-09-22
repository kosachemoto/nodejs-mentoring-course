import "reflect-metadata";
import { injectable, inject } from 'inversify';
import { TYPE } from '@ioc/inversify.types';
import { NUserDAL } from '@models/user';
import { IUsersDAL } from './users.dal.types';

import TUserDAL = NUserDAL.TUserDAL;
import TUserDALDefined = NUserDAL.TUserDALDefined;

// TODO: Поправить возвращаеые типы
@injectable()
export class UsersDAL implements IUsersDAL {
    userModel: TUserDALDefined;

    constructor(
        @inject(TYPE.MODEL.DAL.USER) userModel: TUserDALDefined,
    ) {
        this.userModel = userModel;
    }

    createUser: IUsersDAL['createUser'] = async (creationData) => {
        return this.userModel.create(creationData) as Promise<TUserDAL>;
    }

    getUser: IUsersDAL['getUser'] = async (id) => {
        return this.userModel.findAll({
            where: {
                id,
            }
        }) as Promise<TUserDAL[]>;
    }

    getUsers: IUsersDAL['getUsers'] = async () => {
        return this.userModel.findAll() as Promise<TUserDAL[]>;
    }

    // TODO: Поменять тип
    updateUser: IUsersDAL['updateUser'] = async (data) => {
        return this.userModel.update(data, {
            fields: ['login', 'password', 'age'],
            where: {
                id: data.id
            }
        }) as Promise<[number, TUserDAL[]]>
    }

    deleteUser: IUsersDAL['deleteUser'] = async (id: string) => {
        return this.userModel.update({ isDeleted: true }, {
            fields: ['isDeleted'],
            where: {
                id,
            }
        }) as Promise<[number, TUserDAL[]]>
    }
}