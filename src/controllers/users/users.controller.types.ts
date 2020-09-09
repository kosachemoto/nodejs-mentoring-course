import { Request, Response } from 'express';
import { UsersServiceTypes } from '../../services/users';

export namespace UsersControllerTypes {
    export type GetUserProps = Pick<UsersServiceTypes.User, 'id'>;

    export type UpdateUserProps = Pick<UsersServiceTypes.User, 'id'>;

    export type UpdateUserBody = Partial<Omit<UsersServiceTypes.User, 'id'>>;

    export type DeleteUserProps = Pick<UsersServiceTypes.User, 'id'>;

    export interface Controller {
        usersService: UsersServiceTypes.Service;

        createUser: (req: Request<{}, {}, UsersServiceTypes.SaveData>, res: Response) => void;
        getUser: (req: Request<UsersControllerTypes.GetUserProps>, res: Response) => void;
        getUsers: (req: Request, res: Response) => void;
        updateUser: (req: Request<UsersControllerTypes.UpdateUserProps, {}, UsersControllerTypes.UpdateUserBody>, res: Response) => void;
        deleteUser: (req: Request<UsersControllerTypes.DeleteUserProps>, res: Response) => void;
    }
};
