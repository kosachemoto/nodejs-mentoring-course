import Joi from 'joi';
import { UsersValidationSchemaTypes } from './users.validation-schema.types';

export const usersValidationSchema: UsersValidationSchemaTypes.Schema = {
    createUser: Joi.object({
        login: Joi.string().alphanum().min(3).required(),
        password: Joi.string().alphanum().min(3).required(),
        age: Joi.number().min(4).max(400).required(),
    }),
    getUser: Joi.object({
        id: Joi.string().required(),
    }),
    getUsers: Joi.object({
        loginSubstring: Joi.string(),
        limit: Joi.string(),
    }),
    updateUser: Joi.object({
        id: Joi.string().required(),
        login: Joi.string().alphanum().min(3).required(),
        password: Joi.string().alphanum().min(3).required(),
        age: Joi.number().min(4).max(400).required(),
    }),
    deleteUser: Joi.object({
        id: Joi.string().required(),
    }),
};
