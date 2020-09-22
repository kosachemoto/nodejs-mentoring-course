import Joi from 'joi';
import { NUsersController } from '@controllers/users';

import IUsersController = NUsersController.IUsersController;

export namespace UsersValidationSchemaTypes {
    export type Schema = {
        [key in keyof IUsersController]: Joi.ObjectSchema;
    };
}
