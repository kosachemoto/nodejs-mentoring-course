import { injectable } from 'inversify';
import 'reflect-metadata';

import { v4 } from 'uuid';
import { User, Service } from './users.service.types';
import { ERROR_TYPE } from '@root/src/index.conts';

@injectable()
export class UsersService implements Service {
    users: User[];

    constructor() {
        this.users = [];
    }

    createUser: Service['createUser'] = (data) => {
        const newUser: User = {
            ...data,
            id: v4(),
            isDeleted: false,
        };

        this.users.push(newUser);
    }

    getUser: Service['getUser'] = (id) => {
        const user = this.users.find((user) => user.id === id && !user.isDeleted);

        if (user === undefined) {
            throw(new Error(ERROR_TYPE.ENTITY_DOES_NOT_EXIST));
        }

        return {...user};
    }

    getUsers: Service['getUsers'] = () => {
        return [...this.users];
    }

    updateUser: Service['updateUser'] = (data) => {
        const {
            id,
            ...restData
        } = data;

        const userIndex = this.users.findIndex((user) => user.id === id && !user.isDeleted);

        if (userIndex === undefined) {
            throw(new Error(ERROR_TYPE.ENTITY_DOES_NOT_EXIST));
        }

        this.users[userIndex] = {
            ...this.users[userIndex],
            ...restData,
        };
    }

    deleteUser: Service['deleteUser'] = (id) => {
        const userIndex = this.users.findIndex((user) => user.id === id);

        if (userIndex === -1) {
            throw(new Error(ERROR_TYPE.ENTITY_DOES_NOT_EXIST));
        }

        const user = this.users[userIndex];

        if (user.isDeleted) {
            throw(new Error(ERROR_TYPE.ENTITY_ALREADY_DELETED));
        }

        user.isDeleted = true;
    }

    getAutoSuggestUsers: Service['getAutoSuggestUsers'] = (loginSubstring, limit) => {
        const suggestedUsers = this.users.filter(({ isDeleted, login }) => !isDeleted && login.includes(loginSubstring));

        if (limit === null && limit === undefined) {
            return suggestedUsers;
        }

        return suggestedUsers.slice(0, limit);
    }
}
