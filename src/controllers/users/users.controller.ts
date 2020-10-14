import 'reflect-metadata';
import winston from 'winston';
import { injectable, inject } from 'inversify';
import { TYPE } from '@ioc/inversify.types';
import { NUsersService } from '@services/users';
import { errorLoggerFormat } from '@utils/.';
import { IUsersController } from './users.controller.types';

import IUsersService = NUsersService.IUsersService;

@injectable()
export class UsersController implements IUsersController {
    usersService: IUsersService;
    logger: winston.Logger;

    constructor(
        @inject(TYPE.SERVICE.USERS) usersService: IUsersService,
        @inject(TYPE.WINSTON.LOGGER) logger: winston.Logger,
    ) {
        this.usersService = usersService;
        this.logger = logger;
    }

    createUser: IUsersController['createUser'] = async (req, res) => {
        this.usersService.createUser({
            ...req.body,
        }).then((user) => {
            res.send(user);
        }).catch((error) => {
            this.logger.error(errorLoggerFormat(error));

            throw error;
        }).catch(({ message }) => {
            res.status(400).send({
                message,
            });
        });
    }

    getUser: IUsersController['getUser'] = async (req, res) => {
        const id = req.params.id || '';

        this.usersService.getUser(id)
            .then((user) => {
                res.send(user);
            }).catch((error) => {
                this.logger.error(errorLoggerFormat(error));

                throw error;
            }).catch(({ message }) => {
                res.status(400).send({
                    message,
                });
            })
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
                this.logger.error(errorLoggerFormat(error));

                throw error;
            }).catch(({ message }) => {
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
                this.logger.error(errorLoggerFormat(error));

                throw error;
            }).catch(({ message }) => {
                res.status(400).send({
                    message,
                });
            });
    }

    deleteUser: IUsersController['deleteUser'] = (req, res) => {
        const id = req.params.id || '';

        this.usersService.deleteUser(id)
            .then(() => {
                res.send();
            }).catch((error) => {
                this.logger.error(errorLoggerFormat(error));

                throw error;
            }).catch(({ message }) => {
                res.status(400).send({
                    message,
                });
            });
    }
}
