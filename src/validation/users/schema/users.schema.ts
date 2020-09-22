import "reflect-metadata";
import { injectable } from 'inversify';
import Joi from 'joi';
import { IUsersSchema } from './users.schema.types';

const id = Joi.string().required();
const optionalLogin = Joi.string().min(3);
const requiredLogin = optionalLogin.required();
const optionalPassword = Joi.string().alphanum().min(3).pattern(/[a-zA-Z]/, { name: 'letters' }).pattern(/[0-9]/, { name: 'numbers' });
const requiredPassword = optionalPassword.required();
const optionalAge = Joi.number().min(4).max(400);
const requiredAge = optionalAge.required();

const loginSubstring = Joi.string();
const limit = Joi.string();

@injectable()
export class UsersSchema implements IUsersSchema {
    createUser = Joi.object().keys({
        login: requiredLogin,
        password: requiredPassword,
        age: requiredAge,
    });
    getUser = Joi.object({
        id,
    });
    getUsers = Joi.object({
        loginSubstring,
        limit,
    });
    updateUser = Joi.object({
        id,
        login: optionalLogin,
        password: optionalPassword,
        age: optionalAge,
    });
    deleteUser = Joi.object({
        id,
    });
};