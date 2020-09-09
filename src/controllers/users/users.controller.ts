import { Request, Response } from 'express';
import {
    UsersService,
    UsersServiceTypes
} from '../../services/users';
import { UsersControllerTypes } from './users.controller.types';

const user = new UsersService();

export const createUser = (req: Request<{}, {}, UsersServiceTypes.SaveData>, res: Response) => {
    user.createUser({
        ...req.body,
    });

    res.send(req.statusCode);
};

export const getUser = (req: Request<UsersControllerTypes.GetUserProps>, res: Response) => {
    res.send(user.getUser(req.params.id));
};

export const getUsers = (req: Request, res: Response) => {
    res.send(user.getUsers());
};

export const updateUser = (req: Request<UsersControllerTypes.UpdateUserProps, {}, UsersControllerTypes.UpdateUserBody>, res: Response) => {
    const id = req.params.id;

    user.updateUser({
        id,
        ...req.body,
    });
};

export const deleteUser = (req: Request<UsersControllerTypes.DeleteUserProps>, res: Response) => {
    const id = req.params.id;

    user.deleteUser(id);
};