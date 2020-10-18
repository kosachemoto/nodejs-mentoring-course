import "reflect-metadata";
import { injectable, inject } from 'inversify';
import { TYPE } from '@ioc/inversify.types';
import { NAuthenticationService } from '@services/authentication';
import { IAuthenticationController } from './authentication.controller.types';
import { NAuthentication } from 'src/authentication';

import IAuthenticationService = NAuthenticationService.IAuthenticationService;

@injectable()
export class AuthenticationController implements IAuthenticationController {
    applicationService: IAuthenticationService;
    options: NAuthentication.TOptions;

    constructor(
        @inject(TYPE.SERVICE.AUTHENTICATION) applicationService: IAuthenticationService,
        @inject(TYPE.AUTHENTICATION.OPTIONS) options: NAuthentication.TOptions,
    ) {
        this.applicationService = applicationService;
        this.options = options;
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
            res.status(401).send(error);
        });
    }
}