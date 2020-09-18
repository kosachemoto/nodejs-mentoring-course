import 'reflect-metadata';
import { injectable, inject } from 'inversify';
import { TYPES } from '@root/inversify.types';
import { UsersValidationSchemaTypes } from '@root/src/validation-schemas/users';
import { Validation } from './users.validation.types';

@injectable()
export class UsersValidation implements Validation {
    schema: UsersValidationSchemaTypes.Schema;

    constructor(
        @inject(TYPES.USERS.SCHEMA) schema: UsersValidationSchemaTypes.Schema,
    ) {
        this.schema = schema;
    }

    createUser: Validation['createUser'] = (req, res, next) => {
        const { error } = this.schema.createUser.validate(req.body, { abortEarly: false });

        if (!error) {
            next();
        } else {
            res.status(400).send(error);
        }
    }

    getUser: Validation['getUser'] = (req, res, next) => {
        const { error } = this.schema.getUser.validate(req.params);

        if (!error) {
            next();
        } else {
            res.status(400).send(error);
        }
    }

    getUsers: Validation['getUsers'] = (req, res, next) => {
        const { error } = this.schema.getUsers.validate(req.query);

        if (!error) {
            next();
        } else {
            res.status(400).send(error);
        }

        next();
    }

    updateUser: Validation['updateUser'] = (req, res, next) => {
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

    deleteUser: Validation['deleteUser'] = (req, res, next) => {
        const { error } = this.schema.deleteUser.validate(req.params);

        if (!error) {
            next();
        } else {
            res.status(400).send(error);
        }
    }
}
