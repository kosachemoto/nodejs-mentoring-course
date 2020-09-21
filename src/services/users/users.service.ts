import 'reflect-metadata';
import { inject, injectable } from 'inversify';
import { v4 } from 'uuid';
import { User, Service } from './users.service.types';
import { ERROR_TYPE } from '@root/src/index.conts';
import { UsersDALTypes } from '@root/src/dal/users';
import { TYPES } from '@root/inversify.types';
import { NUserRepository } from '@root/src/repositories/users';

import IUserRepository = NUserRepository.IUserRepository;

@injectable()
export class UsersService implements Service {
    users: User[];
    usersRepository: IUserRepository;

    constructor(
        @inject(TYPES.REPOSITORIES.USERS) usersRepository: IUserRepository,
    ) {
        this.users = [];
        this.usersRepository = usersRepository;
    }

    createUser: Service['createUser'] = async (data) => {
        return this.usersRepository.createUser(data);
    }

    getUser: Service['getUser'] = async (id) => {
        const users = await this.usersRepository.getUser(id);

        return users[0];
    }

    getUsers: Service['getUsers'] = async () => {
        const users = await this.usersRepository.getUsers();

        return users;
    }

    updateUser: Service['updateUser'] = async (data) => {
        return this.usersRepository.updateUser(data);

        // const userIndex = this.users.findIndex((user) => user.id === id && !user.isDeleted);

        // if (userIndex === undefined) {
        //     throw(new Error(ERROR_TYPE.ENTITY_DOES_NOT_EXIST));
        // }

        // this.users[userIndex] = {
        //     ...this.users[userIndex],
        //     ...restData,
        // };
    }

    deleteUser: Service['deleteUser'] = async (id) => {
        return this.usersRepository.deleteUser(id);

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

    getAutoSuggestUsers: Service['getAutoSuggestUsers'] = (loginSubstring, limit) => {
        const suggestedUsers = this.users.filter(({ isDeleted, login }) => !isDeleted && login.includes(loginSubstring));

        if (limit === null && limit === undefined) {
            return suggestedUsers;
        }

        return suggestedUsers.slice(0, limit);
    }
}
