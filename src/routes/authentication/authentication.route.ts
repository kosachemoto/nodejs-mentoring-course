import express from 'express';
import { TYPE } from '@ioc/inversify.types';
import { container } from '@ioc/inversify.config';
import { NAuthenticationController } from '@controllers/authentication';
import { NAuthenticationRules } from '@validation/authentication';

const authenticationRouter = express.Router();

const authenticationController = container.get<NAuthenticationController.IAuthenticationController>(TYPE.CONTROLLER.AUTHENTICATION);
const authenticationRules = container.get<NAuthenticationRules.IAuthenticationRules>(TYPE.VALIDATION.RULES.AUTHENTICATION);

authenticationRouter.route('/login')
    .get(
        authenticationRules.login,
        authenticationController.login);

export { authenticationRouter };
