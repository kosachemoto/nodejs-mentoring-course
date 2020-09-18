import Joi from 'joi';
import { UsersControllerTypes } from '@root/src/controllers/users';

export namespace UsersValidationSchemaTypes {
    export type Schema = {
        [key in keyof UsersControllerTypes.ControllerMethods]: Joi.ObjectSchema;
    };
}
