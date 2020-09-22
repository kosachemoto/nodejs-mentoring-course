import "reflect-metadata";
import { injectable } from 'inversify';
import Joi from 'joi';
import { IUsersSchema } from './users.schema.types';

const id = Joi.string().required();
const login = Joi.string().min(3).required();
const password = Joi.string().alphanum().min(3).pattern(/[a-zA-Z]/, { name: 'letters' }).pattern(/[0-9]/, { name: 'numbers' });
const age = Joi.number().min(4).max(400).required();

const loginSubstring = Joi.string();
const limit = Joi.string();

@injectable()
export class UsersSchema implements IUsersSchema {
    createUser = Joi.object().keys({
        login,
        password,
        age,
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
        login,
        password,
        age,
    });
    deleteUser = Joi.object({
        id,
    });
};