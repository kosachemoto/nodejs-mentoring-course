import { Request, Response, NextFunction } from 'express';
import { NUsersService } from '@services/users';
import { NUserDTO } from '@models/user';

import TUserCreationData = NUsersService.TUserCreationData;
import IUserDTO = NUserDTO.IUserDTO;

// TODO: Добавить префиксы типам
export type GetUserProps = Partial<Pick<IUserDTO, 'id'>>;

export type GetUsersQuery = {
    loginSubstring?: string;
    limit?: number;
};

export type UpdateUserProps = Partial<Pick<IUserDTO, 'id'>>;

export type UpdateUserBody = Partial<Omit<IUserDTO, 'id'>>;

export type DeleteUserProps = Partial<Pick<IUserDTO, 'id'>>;

export interface IUsersController {
    createUser: (req: Request<Record<string, unknown>, Record<string, unknown>, TUserCreationData>, res: Response, next: NextFunction) => void;
    getUser: (req: Request<GetUserProps>, res: Response, next: NextFunction) => void;
    getUsers: (req: Request<Record<string, unknown>, Record<string, unknown>, Record<string, unknown>, GetUsersQuery>, res: Response, next: NextFunction) => void;
    updateUser: (req: Request<UpdateUserProps, Record<string, unknown>, UpdateUserBody>, res: Response, next: NextFunction) => void;
    deleteUser: (req: Request<DeleteUserProps>, res: Response, next: NextFunction) => void;
}

export interface IUsersControllerConstructor {
    new(): IUsersController;
}