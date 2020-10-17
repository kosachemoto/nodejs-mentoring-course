import 'reflect-metadata';
import { injectable, inject } from 'inversify';
import { TYPE } from '@ioc/inversify.types';
import { NApplicationSchema } from '../schema';
import { IApplicationRules } from './application.rules.types';


@injectable()
export class ApplicationRules implements IApplicationRules {
    schema: NApplicationSchema.IApplicationSchema;

    constructor(
        @inject(TYPE.VALIDATION.SCHEMA.APPLICATION) schema: NApplicationSchema.IApplicationSchema,
    ) {
        this.schema = schema;
    }

    login: IApplicationRules['login'] = async (req, res, next) => {
        const { error } = this.schema.login.validate(req.body, { abortEarly: false });

        if (!error) {
            next();
        } else {
            res.status(400).send(error);
        }
    }
}
