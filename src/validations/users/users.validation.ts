import Joi, { equal } from 'joi';
import { Request, Response, NextFunction } from 'express';
import { UsersValidationTypes } from './users.validation.types';
import { UsersControllerTypes } from '../../controllers/users';
import { UsersServiceTypes } from '../../services/users';

export class UsersValidation implements UsersValidationTypes.Validation {
    createUser(req: Request<{}, {}, UsersServiceTypes.CreateData>, res: Response, next: NextFunction) {
        const schema = Joi.object({
            login: Joi.string().alphanum().min(3).required(),
            password: Joi.string().alphanum().min(3).required(),
            age: Joi.number().min(4).max(400).required(),
        });

        const { error } = schema.validate(req.body, { abortEarly: false })

        if (!error) {
            next();
        } else {
            res.status(400).send(error);
        };
    };

    getUser(req: Request<UsersControllerTypes.GetUserProps>, res: Response, next: NextFunction) {
        const schema = Joi.object().keys({
            id: Joi.string().required(),
        });

        const { error } = schema.validate(req.params);

        if (!error) {
            next();
        } else {
            res.status(400).send(error);
        };
    };

    getUsers(req: Request<{}, {}, {}, UsersControllerTypes.GetUsersQuery>, res: Response, next: NextFunction) {
        const schema = Joi.object().keys({
            loginSubstring: Joi.string(),
            limit: Joi.string()
        });

        const { error } = schema.validate(req.query);

        if (!error) {
            next();
        } else {
            res.status(400).send(error);
        };

        next();
    };

    updateUser(req: Request<UsersControllerTypes.UpdateUserProps, {}, UsersControllerTypes.UpdateUserBody>, res: Response, next: NextFunction) {
        const schema = Joi.object().keys({
            id: Joi.string().required(),
            login: Joi.string().min(3).required(),
            password: Joi.string().min(3).required(),
            age: Joi.number().required(),
        });

        const { error } = schema.validate({
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
        const schema = Joi.object().keys({
            id: Joi.string().required(),
        });

        const { error } = schema.validate(req.params);

        if (!error) {
            next();
        } else {
            res.status(400).send(error);
        };
    };
}