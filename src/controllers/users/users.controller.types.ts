import { Request, Response, NextFunction } from 'express';
import { UsersServiceTypes } from '@root/src/services/users';

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
    getUser: (req: Request<GetUserProps>, res: Response, next: NextFunction) => void;
    getUsers: (req: Request<Record<string, unknown>, Record<string, unknown>, Record<string, unknown>, GetUsersQuery>, res: Response, next: NextFunction) => void;
    updateUser: (req: Request<UpdateUserProps, Record<string, unknown>, UpdateUserBody>, res: Response, next: NextFunction) => void;
    deleteUser: (req: Request<DeleteUserProps>, res: Response, next: NextFunction) => void;
}

export interface Controller extends ControllerMethods {
    usersService: UsersServiceTypes.Service;
}
