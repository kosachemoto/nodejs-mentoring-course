import 'reflect-metadata';
import { injectable, inject } from 'inversify';
import { TYPE } from '@ioc/inversify.types';
import { NAuthenticationSchema } from '../schema';
import { IAuthenticationRules } from './authentication.rules.types';


@injectable()
export class AuthenticationRules implements IAuthenticationRules {
    schema: NAuthenticationSchema.IAuthenticationSchema;

    constructor(
        @inject(TYPE.VALIDATION.SCHEMA.APPLICATION) schema: NAuthenticationSchema.IAuthenticationSchema,
    ) {
        this.schema = schema;
    }

    login: IAuthenticationRules['login'] = async (req, res, next) => {
        const { error } = this.schema.login.validate(req.body, { abortEarly: false });

        if (!error) {
            next();
        } else {
            res.status(400).send(error);
        }
    }
}
