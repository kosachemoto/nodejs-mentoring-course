export abstract class CustomError extends Error {
    constructor(message: string = '') {
        super(message);

        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}

export class DataMappingError extends CustomError {
    constructor(message: string = '') {
        super(message);
    }
}

export class AccessTokenDoesNotExist extends CustomError {
    constructor(message: string = '') {
        super(message);
    }
}

export class UserDoesNotExist extends CustomError {
    constructor(message: string = '') {
        super(message);
    }
}

export class UndefinedTokenLife extends CustomError {
    constructor(message: string = '') {
        super(message);
    }
}

export class UndefinedEnvValue extends CustomError {
    constructor(message: string = '') {
        super(message);
    }
}