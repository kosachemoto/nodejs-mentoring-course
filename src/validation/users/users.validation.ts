import { UsersValidationTypes } from './users.validation.types';
import { UsersValidationSchemaTypes } from '../../validation-schemas/users';

import Validation = UsersValidationTypes.Validation;

export class UsersValidation implements Validation {
    schema: UsersValidationSchemaTypes.Schema;

    constructor(schema: UsersValidationSchemaTypes.Schema) {
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
