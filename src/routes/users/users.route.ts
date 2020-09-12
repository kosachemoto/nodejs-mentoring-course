import express from 'express';
import { UsersController } from '../../controllers/users';
import { UsersValidation } from '../../validations/users';

const userRouter = express.Router();
const usersValidation = new UsersValidation();
const usersController = new UsersController();

userRouter.route('/')
    .post(
        usersValidation.createUser,
        usersController.createUser)
    .get(
        usersValidation.getUsers,
        usersController.getUsers)

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
