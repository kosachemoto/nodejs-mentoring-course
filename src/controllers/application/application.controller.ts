import "reflect-metadata";
import { injectable, inject } from 'inversify';
import { TYPE } from '@ioc/inversify.types';
import { NApplicationService } from '@services/application';
import { IApplicationController } from './application.controller.types';

import IApplicationService = NApplicationService.IApplicationService;

@injectable()
export class ApplicationController implements IApplicationController {
    applicationService: IApplicationService;

    constructor(
        @inject(TYPE.SERVICE.APPLICATION) applicationService: IApplicationService,
    ) {
        this.applicationService = applicationService;
    }

    login: IApplicationController['login'] = (req, res) => {
        const { login, password } = req.body;

        this.applicationService.login(login, password);

        res.status(200).send('kek');
    }
}