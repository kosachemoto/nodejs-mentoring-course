import "reflect-metadata";
import { injectable, inject } from 'inversify';
import { TYPE } from '@ioc/inversify.types';
import morgan from 'morgan';
import { Request, } from 'express';
import { IMorganLogger, TMorgan } from './morgan.types';
import { NWinstonTypes } from 'src/logger/winston';

export const argsToken: morgan.TokenCallbackFn = (req) => {
    let args: {
        params?: object;
        query?: object;
        body?: object;
    } = {};

    const { params, query, body } = req as Request;

    if (params && Object.keys(params).length) {
        args.params = params;
    }

    if (query && Object.keys(query).length) {
        args.query = query;
    }

    if (body && Object.keys(body).length) {
        args.body = body;
    }

    return JSON.stringify(args);
}

morgan.token('args', argsToken);

export const requestFormat: morgan.FormatFn = (tokens, req, res) => {
    return [
        '(req)',
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.args(req, res),
    ].join(' ');
}

export const responseFormat: morgan.FormatFn = (tokens, req, res) => {
    return [
        '(res)',
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, 'content-length'), '-',
        tokens['response-time'](req, res), 'ms',
    ].join(' ');
};

@injectable()
export class MorganLogger implements IMorganLogger {
    req: TMorgan;
    res: TMorgan;

    constructor(
        @inject(TYPE.WINSTON.STREAM) stream: NWinstonTypes.IWinstonStream,
    ) {
        this.req = morgan(requestFormat, { immediate: true, stream });
        this.res = morgan(responseFormat, { stream })
    }
}