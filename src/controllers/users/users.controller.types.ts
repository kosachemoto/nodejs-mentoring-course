import { Request, Response, NextFunction } from 'express';
import { UsersServiceTypes } from '../../services/users';

export namespace UsersControllerTypes {
    export type GetUserProps = Partial<Pick<UsersServiceTypes.User, 'id'>>;

    export type GetUsersQuery = {
        loginSubstring?: string;
        limit?: number;
    };

    export type UpdateUserProps = Partial<Pick<UsersServiceTypes.User, 'id'>>;

    export type UpdateUserBody = Partial<Omit<UsersServiceTypes.User, 'id'>>;

    export type DeleteUserProps = Partial<Pick<UsersServiceTypes.User, 'id'>>;

    export interface ControllerMethods {
        createUser: (req: Request<Record<string, unknown>, Record<string, unknown>, UsersServiceTypes.CreateData>, res: Response, next: NextFunction) => void;
        getUser: (req: Request<UsersControllerTypes.GetUserProps>, res: Response, next: NextFunction) => void;
        getUsers: (req: Request<Record<string, unknown>, Record<string, unknown>, Record<string, unknown>, UsersControllerTypes.GetUsersQuery>, res: Response, next: NextFunction) => void;
        updateUser: (req: Request<UsersControllerTypes.UpdateUserProps, Record<string, unknown>, UsersControllerTypes.UpdateUserBody>, res: Response, next: NextFunction) => void;
        deleteUser: (req: Request<UsersControllerTypes.DeleteUserProps>, res: Response, next: NextFunction) => void;
    }

    export interface Controller extends ControllerMethods {
        usersService: UsersServiceTypes.Service;
    }
}
