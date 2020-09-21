import { IUserDomainModel, TUserCreationAttributes } from './user.domain-model.types';

export class UserDomainModel implements IUserDomainModel {
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
    }
}