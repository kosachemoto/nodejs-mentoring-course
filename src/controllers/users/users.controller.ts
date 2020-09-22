import 'reflect-metadata';
import { injectable, inject } from 'inversify';
import { TYPE } from '@ioc/inversify.types';
import { NUsersService } from '@services/users';
import { ERROR_TYPE } from 'src/index.conts';
import { IUsersController } from './users.controller.types';

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
            res.send(error);
        })
    }

    getUser: IUsersController['getUser'] = async (req, res) => {
        // TODO: Добавить это условия в правила валидации
        // TODO: Поправить типы
        const id = req.params.id || '';

        this.usersService.getUser(id)
            .then((users) => {
                res.send(users);
            }).catch((error) => {
                res.send(error);
            })

        // try {
        //     const user = this.usersService.getUser(req.params.id || '');

        //     res.send(user);
        // } catch(error) {
        //     if (error.message === ERROR_TYPE.ENTITY_DOES_NOT_EXIST) {
        //         res.status(400).send({
        //             message: `User with { id: "${id}" } doesn't exist.`,
        //         });
        //     }
        // }
    }

    getUsers: IUsersController['getUsers'] = async (req, res) => {
        const {
            loginSubstring,
            limit,
        } = req.query;

        Promise.resolve()
            .then(() => {
                return loginSubstring ? this.usersService.getAutoSuggestUsers(loginSubstring, limit) :
                    this.usersService.getUsers();
            })
            .then((users) => {
                res.send(users);
            }).catch((error) => {
                res.send(error);
            })

        // TODO: Перенести все эти проверки в сервис
        // if (loginSubstring) {
        //     const users = this.usersService.getAutoSuggestUsers(loginSubstring, limit);

        //     res.send(users);
        // } else {
        //     this.usersService.getUsers().then((users) => {
        //             res.send(limit ? users.splice(0, limit) : users);
        //         }).catch((error) => {
        //             res.send(error)
        //         });

        // }
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
                res.send(error);
            });

        // try {
        //     this.usersService.updateUser({
        //         id,
        //         ...req.body,
        //     });
        // } catch(error) {
        //     if (error.message === ERROR_TYPE.ENTITY_DOES_NOT_EXIST) {
        //         res.status(400).send({
        //             message: `User with { id: "${id}" } doesn't exist.`,
        //         });
        //     }
        // }

        // const updatedUser = this.usersService.getUser(id);

        // res.send(updatedUser);
    }

    deleteUser: IUsersController['deleteUser'] = (req, res) => {
        const id = req.params.id || '';

        this.usersService.deleteUser(id)
            .then((...value) => {
                res.send(value);
            }).catch((error) => {
                res.send(error);
            })

        // try {
        //     this.usersService.deleteUser(id);
        // } catch(error) {
        //     if (error.message === ERROR_TYPE.ENTITY_DOES_NOT_EXIST) {
        //         res.status(400).send({
        //             message: `User with { id: "${id}" } doesn't exist.`,
        //         });
        //     }

        //     if (error.message === ERROR_TYPE.ENTITY_ALREADY_DELETED) {
        //         res.status(404).send({
        //             message: `User with { id: "${id}" } already delted.`,
        //         });
        //     }
        // }

        // res.status(200).end();
    }
}
