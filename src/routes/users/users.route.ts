import express from 'express';
import { TYPE } from '@ioc/inversify.types';
import { container } from '@ioc/inversify.config';
import { NUsersController } from '@controllers/users';
import { NUsersRules } from '@validation/users';
import { NAuthenticationRules } from '@validation/authentication';

import IUsersController = NUsersController.IUsersController;
import IUsersRules = NUsersRules.IUsersRules;
import IAuthenticationRules = NAuthenticationRules.IAuthenticationRules;

const usersRouter = express.Router();

const usersController = container.get<IUsersController>(TYPE.CONTROLLER.USER);
const usersValidation = container.get<IUsersRules>(TYPE.VALIDATION.RULES.USER);
const authenticationValidation = container.get<IAuthenticationRules>(TYPE.VALIDATION.RULES.AUTHENTICATION);

usersRouter.route('/')
    .post(
        authenticationValidation.verify,
        usersValidation.createUser,
        usersController.createUser)
    .get(
        authenticationValidation.verify,
        usersValidation.getUsers,
        usersController.getUsers);

usersRouter.route('/:id')
    .get(
        authenticationValidation.verify,
        usersValidation.getUser,
        usersController.getUser)
    .put(
        authenticationValidation.verify,
        usersValidation.updateUser,
        usersController.updateUser)
    .delete(
        authenticationValidation.verify,
        usersValidation.deleteUser,
        usersController.deleteUser);

export { usersRouter };
