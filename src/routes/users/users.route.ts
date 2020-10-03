import express from 'express';
import { UsersService } from '../../services/users';
import { UsersValidation } from '../../validation/users';
import { UsersController } from '../../controllers/users';
import { usersValidationSchema } from '../../validation-schemas/users';

const userRouter = express.Router();

const usersService = new UsersService();
const usersValidation = new UsersValidation(usersValidationSchema);
const usersController = new UsersController(usersService);

userRouter.route('/')
    .post(
        usersValidation.createUser,
        usersController.createUser)
    .get(
        usersValidation.getUsers,
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
