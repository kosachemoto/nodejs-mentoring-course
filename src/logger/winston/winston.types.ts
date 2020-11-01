import winston from 'winston';
import { TMode } from '@utils/types';

export type TOptions = {
    [key in TMode]: winston.Logger
}

export interface IWinstonStream {
    logger: winston.Logger;

    write(message: string): void;
}