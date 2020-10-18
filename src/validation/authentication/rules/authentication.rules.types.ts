import { NAuthenticationController } from '@controllers/authentication';

export interface IAuthenticationRules {
    login: NAuthenticationController.IAuthenticationController['login'];
}