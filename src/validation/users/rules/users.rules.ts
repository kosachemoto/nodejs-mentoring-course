import 'reflect-metadata';
import { injectable, inject } from 'inversify';
import { TYPE } from '@ioc/inversify.types';
import { NUsersSchema } from '../schema';
import { IUsersRules } from './users.rules.types';

import IUsersSchema = NUsersSchema.IUsersSchema;

@injectable()
export class UsersRules implements IUsersRules {
    schema: IUsersSchema;

    constructor(
        @inject(TYPE.VALIDATION.SCHEMA.USER) schema: IUsersSchema,
    ) {
        this.schema = schema;
    }

    createUser: IUsersRules['createUser'] = async (req, res, next) => {
        const { error } = this.schema.createUser.validate(req.body, { abortEarly: false });

        if (!error) {
            next();
        } else {
            res.status(400).send(error);
        }
    }

    getUser: IUsersRules['getUser'] = async (req, res, next) => {
        const { error } = this.schema.getUser.validate(req.params);

        if (!error) {
            next();
        } else {
            res.status(400).send(error);
        }
    }

    getUsers: IUsersRules['getUsers'] = async (req, res, next) => {
        const { error } = this.schema.getUsers.validate(req.query);

        if (!error) {
            next();
        } else {
            res.status(400).send(error);
        }
    }

    updateUser: IUsersRules['updateUser'] = async (req, res, next) => {
        const { error } = this.schema.updateUser.validate({
            ...req.params,
            ...req.body,
        });

        if (!error) {
            next();
        } else {
            res.status(400).send(error);
        }
    }

    deleteUser: IUsersRules['deleteUser'] = async (req, res, next) => {
        const { error } = this.schema.deleteUser.validate(req.params);

        if (!error) {
            next();
        } else {
            res.status(400).send(error);
        }
    }
}
