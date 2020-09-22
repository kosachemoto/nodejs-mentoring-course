import 'reflect-metadata';
import { injectable, inject } from 'inversify';
import { Sequelize, Options } from 'sequelize';
import { TYPE } from '@ioc/inversify.types';

@injectable()
export class OverloadedSequelize extends Sequelize {
    constructor(
        @inject(TYPE.ORM.DB_OPTIONS) options: Options,
    ) {
        super(options);
    }
};