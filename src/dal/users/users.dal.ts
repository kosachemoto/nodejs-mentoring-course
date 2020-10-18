import "reflect-metadata";
import { injectable, inject } from 'inversify';
import { TYPE } from '@ioc/inversify.types';
import { NUserDAL } from '@models/user';
import { IUsersDAL } from './users.dal.types';

import TUserDAL = NUserDAL.TUserDAL;
import TUserDALDefined = NUserDAL.TUserDALDefined;

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
    
    getUser: IUsersDAL['getUser'] = {
        byId: async (id) => {
            return this.userModel.findAll({
                where: {
                    id,
                }
            }) as Promise<TUserDAL[]>;
        },
        byCredentials: (login, password) => {
            return this.userModel.findAll({
                where: {
                    login,
                    password,
                }
            }) as Promise<TUserDAL[]>
        },
    }

    getUsers: IUsersDAL['getUsers'] = async (limit) => {
        return this.userModel.findAll({ limit }) as Promise<TUserDAL[]>;
    }

    updateUser: IUsersDAL['updateUser'] = async (data) => {
        return this.userModel.update(data, {
            fields: ['login', 'password', 'age'],
            where: {
                id: data.id
            }
        }) as Promise<[number, TUserDAL[]]>;
    }

    deleteUser: IUsersDAL['deleteUser'] = async (id) => {
        return this.userModel.update({ isDeleted: true }, {
            fields: ['isDeleted'],
            where: {
                id,
            }
        }) as Promise<[number, TUserDAL[]]>;
    }
}