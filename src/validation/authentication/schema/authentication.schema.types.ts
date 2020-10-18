import Joi from 'joi';

export interface IAuthenticationSchema {
    login: Joi.ObjectSchema;
}