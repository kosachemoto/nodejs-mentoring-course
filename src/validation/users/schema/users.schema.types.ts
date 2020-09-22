import Joi from 'joi';

export interface IUsersSchema {
    createUser: Joi.ObjectSchema;
    getUser: Joi.ObjectSchema;
    getUsers: Joi.ObjectSchema;
    updateUser: Joi.ObjectSchema;
    deleteUser: Joi.ObjectSchema;
}