import "reflect-metadata";
import { injectable, inject } from 'inversify';
import winston from 'winston';
import { TYPE } from '@ioc/inversify.types';

@injectable()
export class WinstonStream {
    logger: winston.Logger;

    constructor(
        @inject(TYPE.WINSTON.LOGGER) logger: winston.Logger,
    ) {
        this.logger = logger;
    }

    write(message: string) {
        this.logger.info(message.trim());
    }
}