import 'reflect-metadata';
import { inject, injectable } from 'inversify';
import { IUsersService } from './users.service.types';
import { TYPE } from '@ioc/inversify.types';
import { NUserDataMapper } from '@data-mappers/user';
import { NUsersDAL } from '@dal/users';
import { UserDoesNotExist } from 'src/utils';

import IUserDataMapper = NUserDataMapper.IUserDataMapper;
import IUsersDAL = NUsersDAL.IUsersDAL;

@injectable()
export class UsersService implements IUsersService {
    usersDAL: IUsersDAL;
    userDataMapper: IUserDataMapper;

    constructor(
        @inject(TYPE.DAL.USERS) usersDAL: IUsersDAL,
        @inject(TYPE.DATA_MAPPER.USER) userDataMapper: IUserDataMapper,
    ) {
        this.usersDAL = usersDAL;
        this.userDataMapper = userDataMapper;
    }

    createUser: IUsersService['createUser'] = async (data) => {
        return this.usersDAL.createUser(data).then((user) => (
            this.userDataMapper.toDTO(user)
        )).catch((error) => {
            throw error;
        })
    }

    getUser: IUsersService['getUser'] = {
        byId: async (id) => (
            this.usersDAL.getUser.byId(id).then(([ user ]) => (
                this.userDataMapper.toDTO(user)
            )).catch((error) => {
                throw error;
            })
        ),
        byCredentials: async (login, password) => (
            this.usersDAL.getUser.byCredentials(login, password).then(([ user ]) => {
                if (!user) {
                    throw new UserDoesNotExist('User with such credentials does not exist.')
                }
                
                return this.userDataMapper.toDTO(user);
            }).catch((error) => {
                throw error;
            })
        ),
    }

    getUsers: IUsersService['getUsers'] = async (loginSubstring, limit) => {
        return this.usersDAL.getUsers(limit).then((users) => (
            users.map((user) => this.userDataMapper.toDTO(user))
        )).then((users) => {
            if (loginSubstring) {
                return users.filter(({ login }) => login.includes(loginSubstring));
            }

            return users;
        })
        .catch((error) => {
            throw error;
        });
    }

    updateUser: IUsersService['updateUser'] = async (data) => {
        const { id } = data;

        return this.usersDAL.updateUser(data).then(([ status ]) => {
                if (!status) {
                    throw new UserDoesNotExist('');
                }

                return this.usersDAL.getUser.byId(id)
            }).then(([ user ]) => {
                if (!user) {
                    throw new UserDoesNotExist('');
                }

                return user;
            }).then((user) => {
                return this.userDataMapper.toDTO(user);
            }).catch((error) => {
                throw error;
            });
    }

    deleteUser: IUsersService['deleteUser'] = async (id) => {
        return this.usersDAL.deleteUser(id)
            .then(([ status ]) => status);
    }

    getRefreshToken: IUsersService['getRefreshToken'] = async (id) => {
        return this.usersDAL.getUser.byId(id).then(([ user ]) => user.refreshToken);
    }

    updateRefreshToken: IUsersService['updateRefreshToken'] = async (data) => {
        return this.usersDAL.updateRefreshToken(data).then(([ status ]) => {
            if (!status) {
                throw new UserDoesNotExist('');
            }

            return this.usersDAL.getUser.byId(data.id);
        }).then(([ user ]) => {
            if (!user) {
                throw new UserDoesNotExist('');
            }

            return user;
        });
    }
}
