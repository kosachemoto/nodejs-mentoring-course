import { IUserDomain, TUserDomainCreationData } from './user.domain.types';

export class UserDomain implements IUserDomain {
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
    }: TUserDomainCreationData) {
        this.id = id;
        this.login = login;
        this.password = password;
        this.age = age;
        this.isDeleted = isDeleted;
    }
}