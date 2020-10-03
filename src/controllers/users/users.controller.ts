import 'reflect-metadata';
import { injectable, inject } from 'inversify';
import { TYPE } from '@ioc/inversify.types';
import { NUsersService } from '@services/users';
import { IUsersController } from './users.controller.types';
import { DataMappingError, UserDoesNotExist } from 'src/utils';

import IUsersService = NUsersService.IUsersService;

@injectable()
export class UsersController implements IUsersController {
    usersService: IUsersService;

    constructor(
        @inject(TYPE.SERVICE.USERS) usersService: IUsersService,
    ) {
        this.usersService = usersService;
    }

    createUser: IUsersController['createUser'] = async (req, res) => {
        this.usersService.createUser({
            ...req.body,
        }).then((user) => {
            res.send(user);
        }).catch((error) => {
            let message = 'Unexpected error.';

            if (error instanceof DataMappingError) {
                message = error.message;
            }

            res.status(400).send({
                message,
            });
        })
    }

    getUser: IUsersController['getUser'] = async (req, res) => {
        const id = req.params.id || '';

        this.usersService.getUser(id)
            .then((user) => {
                res.send(user);
            }).catch((error) => {
                let message = 'Unexpected error.';

                if (error instanceof DataMappingError) {
                    message = error.message;
                }

                if (error instanceof UserDoesNotExist) {
                    message = `User with { id: "${id}" } doesn't exist.`;
                }

                res.status(400).send({
                    message,
                });
            });
    }

    getUsers: IUsersController['getUsers'] = async (req, res) => {
        const {
            loginSubstring,
            limit,
        } = req.query;

        this.usersService.getUsers(loginSubstring, limit)
            .then((users) => {
                res.send(users);
            }).catch((error) => {
                let message = 'Unexpected error.';
    
                if (error instanceof DataMappingError) {
                    message = error.message;
                }

                if (error instanceof DataMappingError) {
                    message = error.message;
                }
    
                res.status(400).send({
                    message,
                });
            });
    }

    updateUser: IUsersController['updateUser'] = async (req, res) => {
        const id = req.params.id || '';
        const updateData = {
            id,
            ...req.body,
        }

        this.usersService.updateUser(updateData)
            .then((...value) => {
                res.send(value);
            }).catch((error) => {
                let message = 'Unexpected error.';

                if (error instanceof DataMappingError) {
                    message = error.message;
                }

                if (error instanceof UserDoesNotExist) {
                    message = `User with { id: "${id}" } doesn't exist.`;
                }

                res.status(400).send({
                    message,
                });
            })
    }

    deleteUser: IUsersController['deleteUser'] = (req, res) => {
        const id = req.params.id || '';

        this.usersService.deleteUser(id)
            .then(() => {
                res.send();
            }).catch((error) => {
                let message = 'Unexpected error.';

                if (error instanceof UserDoesNotExist) {
                    message = `User with { id: "${id}" } doesn't exist.`;
                }

                res.status(400).send({
                    message,
                });
            })
    }
}
