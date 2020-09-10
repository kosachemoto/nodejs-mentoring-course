import express from 'express';
import { UsersController } from '../../controllers/users';

const userRouter = express.Router();
const usersController = new UsersController();

userRouter.post('/', usersController.createUser);

userRouter.get('/', usersController.getUsers);

userRouter.get('/:id', usersController.getUser);

userRouter.put('/:id', usersController.updateUser);

userRouter.delete('/:id', usersController.deleteUser);

export { userRouter };
