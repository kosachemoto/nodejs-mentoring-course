import { IUserDTO, TUserDTOCreationData } from './user.dto.types';

export class UserDTO implements IUserDTO {
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
    }: TUserDTOCreationData) {
        this.id = id;
        this.login = login;
        this.password = password;
        this.age = age;
        this.isDeleted = isDeleted;
    }
}