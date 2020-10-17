import { Request, Response, NextFunction } from 'express';


export type TLoginData = {
    login: string;
    password: string;
}

export interface IApplicationController {
    login: (req: Request<Record<string, unknown>, Record<string, unknown>, TLoginData>, res: Response, next: NextFunction) => void;
}