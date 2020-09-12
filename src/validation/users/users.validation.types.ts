import { UsersControllerTypes } from '../../controllers/users';
import { UsersServiceTypes } from '../../services/users';
import { UsersValidationSchemaTypes } from '../../validation-schemas/users';

export namespace UsersValidationTypes {
    export type CreateUserSchema = UsersServiceTypes.CreateData;

    export type GetUserSchema = {
        id: string;
    };

    export type UpdateUserSchema = UsersServiceTypes.UpdateData;

    export type DeleteUserSchema = {
        id: string;
    };

    export interface ValidationMethods {
        createUser: UsersControllerTypes.Controller['createUser'];
        getUser: UsersControllerTypes.Controller['getUser'];
        getUsers: UsersControllerTypes.Controller['getUsers'];
        updateUser: UsersControllerTypes.Controller['updateUser'];
        deleteUser: UsersControllerTypes.Controller['deleteUser'];
    };

    export interface Validation extends ValidationMethods {
        schema: UsersValidationSchemaTypes.Schema;
    };
};
