import "reflect-metadata";
import { injectable } from 'inversify';
import Joi from 'joi';
import { IAuthenticationSchema } from './authentication.schema.types';

@injectable()
export class AuthenticationSchema implements IAuthenticationSchema {
    login = Joi.object().keys({
        login: Joi.required(),
        password: Joi.required(),
    });
}