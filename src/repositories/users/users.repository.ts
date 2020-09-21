import "reflect-metadata";
import { injectable, inject } from 'inversify';
import { UsersDALTypes } from "@root/src/dal/users";
import { TYPES } from "@root/inversify.types";
import { TUserDataMapper } from '@root/src/data-mappers/user';
import { IUserRepository } from './user.repository.types'

import IUserDataMapper = TUserDataMapper.IUserDataMapper;
import TUserDAL = UsersDALTypes.DAL;

@injectable()
export class UserRepository implements IUserRepository {
    dataMapper: IUserDataMapper;
    userDAL: TUserDAL;

    constructor(
        @inject(TYPES.DATA_MAPPER.USER) dataMapper: IUserDataMapper,
        @inject(TYPES.DAL.USERS) userDAL: TUserDAL,
    ) {
        this.dataMapper = dataMapper;
        this.userDAL = userDAL;
    }

    createUser: IUserRepository['createUser'] = async (data) => {
        return this.userDAL.createUser(data)
            .then((dalUser) => this.dataMapper.toDomain(dalUser));
    }

    getUser: IUserRepository['getUser'] = async (id) => {
        return this.userDAL.getUser(id)
            .then((dalUsers) => dalUsers.map((dalUser) => this.dataMapper.toDomain(dalUser)));
    }

    getUsers: IUserRepository['getUsers'] = async () => {
        return this.userDAL.getUsers()
            .then((dalUsers) => dalUsers.map((dalUser) => this.dataMapper.toDomain(dalUser)));
    }

    // TODO: Нейминг
    updateUser: IUserRepository['updateUser'] = async (data) => {
        return this.userDAL.updateUser(data)
            // .then(([something, dalUsers]) => [something, dalUsers.map((dalUser) => this.dataMapper.toDomain(dalUser))]);
    }

    deleteUser: IUserRepository['deleteUser'] = async (id) => {
        return this.userDAL.deleteUser(id);
    }
}