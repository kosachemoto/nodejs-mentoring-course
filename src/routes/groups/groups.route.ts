import express from 'express';
import { TYPE } from '@ioc/inversify.types';
import { container } from '@ioc/inversify.config';
import { NGroupsController } from '@controllers/groups';

import IGroupsController = NGroupsController.IGroupsController;

const groupsRoute = express.Router();

const groupsController = container.get<IGroupsController>(TYPE.CONTROLLER.GROUP);

groupsRoute.route('/')
    .post(groupsController.createGroup)
    .get(groupsController.getGroups);

    groupsRoute.route('/:id')
    .get(groupsController.getGroup)
    .put(groupsController.updateGroup)
    .delete(groupsController.deleteGroup);

export { groupsRoute };
