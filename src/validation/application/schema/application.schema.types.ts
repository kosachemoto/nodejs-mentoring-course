import Joi from 'joi';

export interface IApplicationSchema {
    login: Joi.ObjectSchema;
}