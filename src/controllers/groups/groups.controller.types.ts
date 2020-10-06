import { Request, Response, NextFunction } from 'express';
import { NGroupsService } from '@services/groups';
import { NGroupDTO } from '@models/group';

import TGroupCreationData = NGroupsService.TGroupCreationData;
import IGroupDTO = NGroupDTO.IGroupDTO;

export type TGetGroupProps = Partial<Pick<IGroupDTO, 'id'>>;

export type TUpdateGroupProps = Partial<Pick<IGroupDTO, 'id'>>;

export type TUpdateGroupBody = Partial<Omit<IGroupDTO, 'id'>>;

export type TDeleteGroupProps = Partial<Pick<IGroupDTO, 'id'>>

export interface IGroupsController {
    createGroup: (req: Request<Record<string, unknown>, Record<string, unknown>, TGroupCreationData>, res: Response, next: NextFunction) => void;
    getGroup: (req: Request<TGetGroupProps>, res: Response, next: NextFunction) => void;
    getGroups: (req: Request<Record<string, unknown>, Record<string, unknown>, Record<string, unknown>>, res: Response, next: NextFunction) => void;
    updateGroup: (req: Request<TUpdateGroupProps, Record<string, unknown>, TUpdateGroupBody>, res: Response, next: NextFunction) => void;
    deleteGroup: (req: Request<TDeleteGroupProps>, res: Response, next: NextFunction) => void;
    addGroupUsers: (req: Request, res: Response, next: NextFunction) => void;
    getGroupUsers: (req: Request, res: Response, next: NextFunction) => void;
}

export interface IGroupsControllerConstructor {
    new(): IGroupsController;
}