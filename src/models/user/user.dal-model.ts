import { IUserDALModel, TUserCreationAttributes } from './user.dal-model.types';

export class UserDALModel implements IUserDALModel {
    id: string;
    login: string;
    password: string;
    age: number;
    isDeleted: boolean;

    constructor({
        id,
        login,
        password,
        age,
        isDeleted,
    }: TUserCreationAttributes) {
        this.id = id;
        this.login = login;
        this.password = password;
        this.age = age;
        this.isDeleted = isDeleted;

        return this;
    }
}