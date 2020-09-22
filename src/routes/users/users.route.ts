import express from 'express';
import { TYPE } from '@ioc/inversify.types';
import { container } from '@ioc/inversify.config';
import { NUsersController } from '@controllers/users';
import { UsersValidationTypes } from '@validation/users';

import IUsersController = NUsersController.IUsersController;

const userRouter = express.Router();

const usersController = container.get<IUsersController>(TYPE.CONTROLLER.USER);
const usersValidation = container.get<UsersValidationTypes.Validation>(TYPE.VALIDATION.RULES.USER);

userRouter.route('/')
    .post(
        usersValidation.createUser,
        usersController.createUser)
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
