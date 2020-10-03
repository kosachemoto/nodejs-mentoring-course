import { UsersServiceTypes } from '../../services/users';
import { UsersControllerTypes } from './users.controller.types';
import { ERROR_TYPE } from '../../index.conts';

import Controller = UsersControllerTypes.Controller;

export class UsersController implements Controller {
    usersService: UsersServiceTypes.Service;

    constructor(usersService: UsersServiceTypes.Service) {
        this.usersService = usersService;
    }

    createUser: Controller['createUser'] = (req, res) => {
        this.usersService.createUser({
            ...req.body,
        });

        res.send(req.statusCode);
    }

    getUser: Controller['getUser'] = (req, res) => {
        const id = req.params.id || '';

        try {
            const user = this.usersService.getUser(req.params.id || '');

            res.send(user);
        } catch(error) {
            if (error.message === ERROR_TYPE.ENTITY_DOES_NOT_EXIST) {
                res.status(400).send({
                    message: `User with { id: "${id}" } doesn't exist.`,
                });
            }
        }
    }

    getUsers: Controller['getUsers'] = (req, res) => {
        const {
            loginSubstring,
            limit,
        } = req.query;

        if (loginSubstring) {
            const users = this.usersService.getAutoSuggestUsers(loginSubstring, limit);

            res.send(users);
        } else {
            const users = this.usersService.getUsers();

            res.send(limit ? users.splice(0, limit) : users);
        }
    }

    updateUser: Controller['updateUser'] = (req, res) => {
        const id = req.params.id || '';

        try {
            this.usersService.updateUser({
                id,
                ...req.body,
            });
        } catch(error) {
            if (error.message === ERROR_TYPE.ENTITY_DOES_NOT_EXIST) {
                res.status(400).send({
                    message: `User with { id: "${id}" } doesn't exist.`,
                });
            }
        }

        const updatedUser = this.usersService.getUser(id);

        res.send(updatedUser);
    }

    deleteUser: Controller['deleteUser'] = (req, res) => {
        const id = req.params.id || '';

        try {
            this.usersService.deleteUser(id);
        } catch(error) {
            if (error.message === ERROR_TYPE.ENTITY_DOES_NOT_EXIST) {
                res.status(400).send({
                    message: `User with { id: "${id}" } doesn't exist.`,
                });
            }

            if (error.message === ERROR_TYPE.ENTITY_ALREADY_DELETED) {
                res.status(404).send({
                    message: `User with { id: "${id}" } already delted.`,
                });
            }
        }

        res.status(200).end();
    }
}
