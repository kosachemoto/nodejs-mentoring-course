import { Request, Response, NextFunction } from 'express';
import { NAuthenticationController } from '@controllers/authentication';

export interface IAuthenticationRules {
    login: NAuthenticationController.IAuthenticationController['login'];
    verify: (req: Request, res: Response, next: NextFunction) => void; 
}