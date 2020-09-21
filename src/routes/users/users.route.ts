import express from 'express';
import { TYPES } from '@root/inversify.types';
import { container } from '@root/inversify.config';
import { UsersControllerTypes } from '@root/src/controllers/users';
import { UsersValidationTypes } from '@root/src/validation/users';

const {
    CONTROLLER,
    VALIDATION,
} = TYPES.USERS;

const userRouter = express.Router();

const usersController = container.get<UsersControllerTypes.Controller>(CONTROLLER);
const usersValidation = container.get<UsersValidationTypes.Validation>(VALIDATION);

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
