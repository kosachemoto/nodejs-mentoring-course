import express from 'express';
import { TYPE } from '@ioc/inversify.types';
import { container } from '@ioc/inversify.config';
import { NGroupsController } from '@controllers/groups';
import { NAuthenticationRules } from '@validation/authentication';

import IGroupsController = NGroupsController.IGroupsController;
import IAuthenticationRules = NAuthenticationRules.IAuthenticationRules;

const groupsRoute = express.Router();

const groupsController = container.get<IGroupsController>(TYPE.CONTROLLER.GROUP);
const authenticationValidation = container.get<IAuthenticationRules>(TYPE.VALIDATION.RULES.AUTHENTICATION);

groupsRoute.route('/')
    .post(authenticationValidation.verify, groupsController.createGroup)
    .get(authenticationValidation.verify, groupsController.getGroups);

groupsRoute.route('/:id')
    .get(authenticationValidation.verify, groupsController.getGroup)
    .put(authenticationValidation.verify, groupsController.updateGroup)
    .delete(authenticationValidation.verify, groupsController.deleteGroup);
    
groupsRoute.route('/:id/users/')
    .post(authenticationValidation.verify, groupsController.addGroupUsers)
    .get(authenticationValidation.verify, groupsController.getGroupUsers);


export { groupsRoute };
