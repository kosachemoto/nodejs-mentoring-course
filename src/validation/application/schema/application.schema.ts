import "reflect-metadata";
import { injectable } from 'inversify';
import Joi from 'joi';
import { IApplicationSchema } from './application.schema.types';

@injectable()
export class ApplicationSchema implements IApplicationSchema {
    login = Joi.object().keys({
        login: Joi.required(),
        password: Joi.required(),
    });
}