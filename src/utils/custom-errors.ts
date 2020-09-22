export class UserDoesNotExist extends Error {
    constructor(message: string = '') {
        super(message);
        this.name = 'UserDoesNotExist';
    }
}