import express from 'express';
import { TYPE } from '@ioc/inversify.types';
import { container } from '@ioc/inversify.config';
import { NUsersController } from '@controllers/users';
import { NUsersRules } from '@validation/users';

import IUsersController = NUsersController.IUsersController;
import IUsersRules = NUsersRules.IUsersRules;

const userRouter = express.Router();

const usersController = container.get<IUsersController>(TYPE.CONTROLLER.USER);
const usersValidation = container.get<IUsersRules>(TYPE.VALIDATION.RULES.USER);

userRouter.route('/')
    .post(
        usersValidation.createUser,
        usersController.createUser)
    // TODO: Разобраться, что здесь не так с валидацией
    .get(
        // usersValidation.getUsers,
        usersController.getUsers);

userRouter.route('/:id')
    .get(
        usersValidation.getUser,
        usersController.getUser)
    .put(
        usersValidation.updateUser,
        usersController.updateUser)
    .delete(
        usersValidation.deleteUser,
        usersController.deleteUser);

export { userRouter };
