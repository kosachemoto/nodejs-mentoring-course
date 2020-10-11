import winston from 'winston';
import morgan from 'morgan';
import { Request, Response } from 'express';
import { TMode } from '@utils/types';

export type TOptions = {
    [key in TMode]: winston.Logger
}

export type TMorgan = ReturnType<morgan.Morgan<Request, Response>>;

export interface IMorganLogger {
    req: TMorgan;
    res: TMorgan;
}