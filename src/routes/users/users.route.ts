import express from 'express';
import { TYPE } from '@ioc/inversify.types';
import { container } from '@ioc/inversify.config';
import { NUsersController } from '@controllers/users';
import { NUsersRules } from '@validation/users';

import IUsersController = NUsersController.IUsersController;
import IUsersRules = NUsersRules.IUsersRules;

const usersRouter = express.Router();

const usersController = container.get<IUsersController>(TYPE.CONTROLLER.USER);
const usersValidation = container.get<IUsersRules>(TYPE.VALIDATION.RULES.USER);
const authenticationValidation = container.get<any>(TYPE.VALIDATION.RULES.AUTHENTICATION);

usersRouter.route('/')
    .post(
        usersValidation.createUser,
        usersController.createUser)
    .get(
        usersValidation.getUsers,
        usersController.getUsers);

usersRouter.route('/:id')
    .get(
        usersValidation.getUser,
        usersController.getUser)
    .put(
        usersValidation.updateUser,
        usersController.updateUser)
    .delete(
        usersValidation.deleteUser,
        usersController.deleteUser);

export { usersRouter };
