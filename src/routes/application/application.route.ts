import express from 'express';
import { TYPE } from '@ioc/inversify.types';
import { container } from '@ioc/inversify.config';
import { NApplicationController } from '@controllers/application';
import { NApplicationRules } from '@validation/application';

const applicationRouter = express.Router();

const applicationController = container.get<NApplicationController.IApplicationController>(TYPE.CONTROLLER.APPLICATION);
const applicationRules = container.get<NApplicationRules.IApplicationRules>(TYPE.VALIDATION.RULES.APPLICATION);

applicationRouter.route('/login')
    .get(
        applicationRules.login,
        applicationController.login);

export { applicationRouter };
