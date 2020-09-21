import 'reflect-metadata';
import { injectable, inject } from 'inversify';
import { TYPES } from '@root/inversify.types';
import { Sequelize, Options } from 'sequelize';

@injectable()
export class OverloadedSequelize extends Sequelize {
    constructor(
        @inject(TYPES.ORM.DB_OPTIONS) options: Options,
    ) {
        super(options);
    }
};