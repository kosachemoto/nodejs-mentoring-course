import { NApplicationController } from '@controllers/application';

export interface IApplicationRules {
    login: NApplicationController.IApplicationController['login'];
}