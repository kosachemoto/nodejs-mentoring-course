export class DataMappingError extends Error {
    constructor(message: string = 'DataMappingError') {
        super(message);
        this.name = 'DataMappingError';
    }
}

export class UserDoesNotExist extends Error {
    constructor(message: string = 'UserDoesNotExist') {
        super(message);
        this.name = 'UserDoesNotExist';
    }
}