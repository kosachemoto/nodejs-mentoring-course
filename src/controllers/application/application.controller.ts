import "reflect-metadata";
import { injectable, inject } from 'inversify';
import { TYPE } from '@ioc/inversify.types';
import { NApplicationService } from '@services/application';
import { IApplicationController } from './application.controller.types';
import { NAuthentication } from 'src/authentication';

import IApplicationService = NApplicationService.IApplicationService;

@injectable()
export class ApplicationController implements IApplicationController {
    applicationService: IApplicationService;
    options: NAuthentication.TOptions;

    constructor(
        @inject(TYPE.SERVICE.APPLICATION) applicationService: IApplicationService,
        @inject(TYPE.AUTHENTICATION.OPTIONS) options: NAuthentication.TOptions,
    ) {
        this.applicationService = applicationService;
        this.options = options;
    }

    login: IApplicationController['login'] = async (req, res) => {
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

    refresh: IApplicationController['refresh'] = async (req, res) => {
        const accessToken = req ? (req.cookies ? req.cookies.jwt : null) : null;

        return this.applicationService.refresh(accessToken).then((newAccessToken) => {
            res.cookie(
                "jwt",
                newAccessToken,
                { httpOnly: true, expires: new Date(Date.now() + this.options.ACCESS_TOKEN_LIFE) });
        }).then(() => {
            res.send();
        }).catch((error) => {
            res.status(401).send(error);
        });
    }
}