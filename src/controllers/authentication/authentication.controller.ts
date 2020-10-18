import "reflect-metadata";
import { injectable, inject } from 'inversify';
import winston from 'winston';
import { TYPE } from '@ioc/inversify.types';
import { NAuthenticationService } from '@services/authentication';
import { IAuthenticationController } from './authentication.controller.types';
import { NAuthentication } from 'src/authentication';
import { errorLoggerFormat } from "@utils/.";

import IAuthenticationService = NAuthenticationService.IAuthenticationService;

@injectable()
export class AuthenticationController implements IAuthenticationController {
    applicationService: IAuthenticationService;
    options: NAuthentication.TOptions;
    logger: winston.Logger

    constructor(
        @inject(TYPE.SERVICE.AUTHENTICATION) applicationService: IAuthenticationService,
        @inject(TYPE.AUTHENTICATION.OPTIONS) options: NAuthentication.TOptions,
        @inject(TYPE.WINSTON.LOGGER) logger: winston.Logger,
    ) {
        this.applicationService = applicationService;
        this.options = options;0
        this.logger = logger;
    }

    login: IAuthenticationController['login'] = async (req, res) => {
        const { login, password } = req.body;

        return this.applicationService.login(login, password).then((accessToken) => {
            res.cookie(
                "jwt",
                accessToken,
                { httpOnly: true, expires: new Date(Date.now() + this.options.ACCESS_TOKEN_LIFE) });
        }).then(() => {
            res.send();
        }).catch((error) => {
            this.logger.error(errorLoggerFormat(error));

            throw error;
        }).catch((error) => {
            res.status(401).send(error);
        });
    }
}