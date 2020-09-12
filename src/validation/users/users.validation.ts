import Joi, { equal } from 'joi';
import { Request, Response, NextFunction } from 'express';
import { UsersValidationTypes } from './users.validation.types';
import { UsersControllerTypes } from '../../controllers/users';
import { UsersServiceTypes } from '../../services/users';
import { UsersValidationSchemaTypes } from '../../validation-schemas/users';

export class UsersValidation implements UsersValidationTypes.Validation {
    schema: UsersValidationSchemaTypes.Schema;

    constructor(schema: UsersValidationSchemaTypes.Schema) {
        this.schema = schema;
    };

    createUser(req: Request<{}, {}, UsersServiceTypes.CreateData>, res: Response, next: NextFunction) {
        const { error } = this.schema.createUser.validate(req.body, { abortEarly: false })

        if (!error) {
            next();
        } else {
            res.status(400).send(error);
        };
    };

    getUser(req: Request<UsersControllerTypes.GetUserProps>, res: Response, next: NextFunction) {
        const { error } = this.schema.getUser.validate(req.params);

        if (!error) {
            next();
        } else {
            res.status(400).send(error);
        };
    };

    getUsers(req: Request<{}, {}, {}, UsersControllerTypes.GetUsersQuery>, res: Response, next: NextFunction) {
        const { error } = this.schema.getUsers.validate(req.query);

        if (!error) {
            next();
        } else {
            res.status(400).send(error);
        };

        next();
    };

    updateUser(req: Request<UsersControllerTypes.UpdateUserProps, {}, UsersControllerTypes.UpdateUserBody>, res: Response, next: NextFunction) {
        const { error } = this.schema.updateUser.validate({
            ...req.params,
            ...req.body,
        });

        if (!error) {
            next();
        } else {
            res.status(400).send(error);
        };
    };

    deleteUser(req: Request<UsersControllerTypes.DeleteUserProps>, res: Response, next: NextFunction) {
        const { error } = this.schema.deleteUser.validate(req.params);

        if (!error) {
            next();
        } else {
            res.status(400).send(error);
        };
    };
}