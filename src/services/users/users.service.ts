import 'reflect-metadata';
import { inject, injectable } from 'inversify';
import { v4 } from 'uuid';
import { IUsersService } from './users.service.types';
import { ERROR_TYPE } from 'src/index.conts';
import { TYPE } from '@ioc/inversify.types';
import { NUsersDAL } from '@dal/users';

import IUsersDAL = NUsersDAL.IUsersDAL;

// TODO: Добавить маппинг данных
@injectable()
export class UsersService implements IUsersService {
    users: any[];
    usersDAL: IUsersDAL;

    constructor(
        @inject(TYPE.DAL.USERS) usersDAL: IUsersDAL,
    ) {
        this.users = [];
        this.usersDAL = usersDAL;
    }

    createUser: IUsersService['createUser'] = async (data) => {
        return this.usersDAL.createUser(data);
    }

    getUser: IUsersService['getUser'] = async (id) => {
        const users = await this.usersDAL.getUser(id);

        return users[0];
    }

    getUsers: IUsersService['getUsers'] = async () => {
        const users = await this.usersDAL.getUsers();

        return users;
    }

    updateUser: IUsersService['updateUser'] = async (data) => {
        return this.usersDAL.updateUser(data);

        // const userIndex = this.users.findIndex((user) => user.id === id && !user.isDeleted);

        // if (userIndex === undefined) {
        //     throw(new Error(ERROR_TYPE.ENTITY_DOES_NOT_EXIST));
        // }

        // this.users[userIndex] = {
        //     ...this.users[userIndex],
        //     ...restData,
        // };
    }

    deleteUser: IUsersService['deleteUser'] = async (id) => {
        return this.usersDAL.deleteUser(id);

        // const userIndex = this.users.findIndex((user) => user.id === id);

        // if (userIndex === -1) {
        //     throw(new Error(ERROR_TYPE.ENTITY_DOES_NOT_EXIST));
        // }

        // const user = this.users[userIndex];

        // if (user.isDeleted) {
        //     throw(new Error(ERROR_TYPE.ENTITY_ALREADY_DELETED));
        // }

        // user.isDeleted = true;
    }

    getAutoSuggestUsers: IUsersService['getAutoSuggestUsers'] = (loginSubstring, limit) => {
        const suggestedUsers = this.users.filter(({ isDeleted, login }) => !isDeleted && login.includes(loginSubstring));

        if (limit === null && limit === undefined) {
            return suggestedUsers;
        }

        return suggestedUsers.slice(0, limit);
    }
}
