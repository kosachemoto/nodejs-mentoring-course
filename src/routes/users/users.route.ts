import express from 'express';
import {
    createUser,
    getUser,
    getUsers,
    updateUser,
    deleteUser,
} from '../../controllers/users';

const userRouter = express.Router();

userRouter.post('/users', createUser);

userRouter.get('/users', getUsers);

userRouter.get('/users/:id', getUser);

userRouter.put('/users/:id', updateUser);

userRouter.delete('/users/:id', deleteUser);

export { userRouter };