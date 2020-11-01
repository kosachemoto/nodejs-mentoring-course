import 'reflect-metadata';
import { injectable, inject } from 'inversify';
import jwt from 'jsonwebtoken';
import { TYPE } from '@ioc/inversify.types';
import { NAuthenticationSchema } from '../schema';
import { IAuthenticationRules } from './authentication.rules.types';
import { NAuthentication } from 'src/authentication';


@injectable()
export class AuthenticationRules implements IAuthenticationRules {
    schema: NAuthenticationSchema.IAuthenticationSchema;
    options: NAuthentication.TOptions;

    constructor(
        @inject(TYPE.VALIDATION.SCHEMA.AUTHENTICATION) schema: NAuthenticationSchema.IAuthenticationSchema,
        @inject(TYPE.AUTHENTICATION.OPTIONS) options: NAuthentication.TOptions,
    ) {
        this.schema = schema;
        this.options = options;
    }

    login: IAuthenticationRules['login'] = async (req, res, next) => {
        const { error } = this.schema.login.validate(req.body, { abortEarly: false });

        if (!error) {
            next();
        } else {
            res.status(400).send(error);
        }
    }

    verify: IAuthenticationRules['verify'] = async (req, res, next) => {
        const accessToken = await Promise.resolve(req.cookies.jwt).then((accessToken) => {
            if (!accessToken) {
                throw new Error();
            }

            return accessToken;
        }).catch((error) => {
            res.status(401).send();

            throw error;
        });
        
        await Promise.resolve(accessToken).then((accessToken) => {
            jwt.verify(accessToken, this.options.ACCESS_TOKEN_SECRET)
        }).then(() => {
            next();
        }).catch((error) => {
            return res.status(403).send(error);
        });
    }
}
