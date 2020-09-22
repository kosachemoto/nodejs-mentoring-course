import 'reflect-metadata';
import { inject, injectable } from 'inversify';
import { IUsersService } from './users.service.types';
import { TYPE } from '@ioc/inversify.types';
import { NUsersDAL } from '@dal/users';
import { UserDoesNotExist } from 'src/utils';

import IUsersDAL = NUsersDAL.IUsersDAL;

@injectable()
export class UsersService implements IUsersService {
    users: any[];
    usersDAL: IUsersDAL;
    
    // TODO: Добавить маппинг данных
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
        const [ user ] = await this.usersDAL.getUser(id);

        if (!user) {
            throw new UserDoesNotExist();
        }

        return user;
    }

    getUsers: IUsersService['getUsers'] = async (loginSubstring, limit) => {
        const users = await this.usersDAL.getUsers(limit);

        if (loginSubstring) {
            return users.filter(({ login }) => login.includes(loginSubstring));
        }

        return users;
    }

    updateUser: IUsersService['updateUser'] = async (data) => {
        return this.usersDAL.updateUser(data);
    }

    deleteUser: IUsersService['deleteUser'] = async (id) => {
        return this.usersDAL.deleteUser(id);
    }
}
