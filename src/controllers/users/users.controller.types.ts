import { Request, Response, NextFunction } from 'express';
import { NUsersService } from '@services/users';
import { NUserDTO } from '@models/user';

import IUsersService = NUsersService.IUsersService;
import TUserCreationData = NUsersService.TUserCreationData;
import IUserDTO = NUserDTO.IUserDTO;

export type TGetUserProps = Partial<Pick<IUserDTO, 'id'>>;

export type TGetUsersQuery = {
    loginSubstring?: string;
    limit?: number;
};

export type TUpdateUserProps = Partial<Pick<IUserDTO, 'id'>>;

export type TUpdateUserBody = Partial<Omit<IUserDTO, 'id'>>;

export type TDeleteUserProps = Partial<Pick<IUserDTO, 'id'>>;

export interface IUsersController {
    createUser: (req: Request<Record<string, unknown>, Record<string, unknown>, TUserCreationData>, res: Response, next: NextFunction) => void;
    getUser: (req: Request<TGetUserProps>, res: Response, next: NextFunction) => void;
    getUsers: (req: Request<Record<string, unknown>, Record<string, unknown>, Record<string, unknown>, TGetUsersQuery>, res: Response, next: NextFunction) => void;
    updateUser: (req: Request<TUpdateUserProps, Record<string, unknown>, TUpdateUserBody>, res: Response, next: NextFunction) => void;
    deleteUser: (req: Request<TDeleteUserProps>, res: Response, next: NextFunction) => void;
}

export interface IUsersControllerConstructor {
    new(usersService: IUsersService): IUsersController;
}