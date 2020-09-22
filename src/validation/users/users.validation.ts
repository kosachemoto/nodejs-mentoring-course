import 'reflect-metadata';
import { injectable, inject } from 'inversify';
import { TYPE } from '@ioc/inversify.types';
import { UsersValidationSchemaTypes } from 'src/validation-schemas/users';
import { Validation } from './users.validation.types';

@injectable()
export class UsersValidation implements Validation {
    schema: UsersValidationSchemaTypes.Schema;

    constructor(
        @inject(TYPE.VALIDATION.SCHEMA.USER) schema: UsersValidationSchemaTypes.Schema,
    ) {
        this.schema = schema;
    }

    createUser: Validation['createUser'] = async (req, res, next) => {
        const { error } = this.schema.createUser.validate(req.body, { abortEarly: false });

        if (!error) {
            next();
        } else {
            res.status(400).send(error);
        }
    }

    getUser: Validation['getUser'] = async (req, res, next) => {
        const { error } = this.schema.getUser.validate(req.params);

        if (!error) {
            next();
        } else {
            res.status(400).send(error);
        }
    }

    getUsers: Validation['getUsers'] = async (req, res, next) => {
        const { error } = this.schema.getUsers.validate(req.query);

        if (!error) {
            next();
        } else {
            res.status(400).send(error);
        }

        next();
    }

    updateUser: Validation['updateUser'] = async (req, res, next) => {
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

    deleteUser: Validation['deleteUser'] = async (req, res, next) => {
        const { error } = this.schema.deleteUser.validate(req.params);

        if (!error) {
            next();
        } else {
            res.status(400).send(error);
        }
    }
}
