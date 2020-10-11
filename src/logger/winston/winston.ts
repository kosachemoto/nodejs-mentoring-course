import "reflect-metadata";
import { injectable, inject } from 'inversify';
import { TYPE } from '@ioc/inversify.types';
import winston from 'winston';
import { TMode } from '@utils/types';
import { TOptions } from './winston.types';
import { ROOT_PATH, DEVELOPMENT, PRODUCTION } from '@utils/variables';

export const LOGS_ROOT = ROOT_PATH + '/logs';

export const LOGS_PATH = {
    INFO: LOGS_ROOT + '/logs.info.txt',
    WARN: LOGS_ROOT + '/logs.warn.txt',
    ERROR: LOGS_ROOT + '/logs.error.txt',
};

const format = winston.format;
const { timestamp, colorize } = format;

export const winstonFormatCombiner = format.printf(({
    timestamp,
    level,
    message,
}) => {
    return `[${timestamp}][${level}] ${message}`
});

export const winstonFormat = {
    console: format.combine(
        colorize(),
        timestamp(),
        winstonFormatCombiner,
    ),
    file: format.combine(
        timestamp(),
        winstonFormatCombiner,
    ),
}

export const options: TOptions = {
    [DEVELOPMENT]: winston.createLogger({
        format: winstonFormat.console,
        transports: [
            new winston.transports.Console({
                level: 'info',
                handleExceptions: true,
            }),
        ],
    
        exitOnError: false,
    }),
    [PRODUCTION]: winston.createLogger({
        format: winstonFormat.file,
        transports: [
            new winston.transports.File({
                level: 'info',
                filename: LOGS_PATH.INFO,
                handleExceptions: true,
                eol: '\n',
            }),
        ],
        exitOnError: false,
    }),
}

@injectable()
export class WinstonLogger {
    constructor(
        @inject(TYPE.APPLICATION.MODE) mode: TMode,
    ) {
        const currentOptions = options[mode];

        return winston.createLogger(currentOptions);
    }
}