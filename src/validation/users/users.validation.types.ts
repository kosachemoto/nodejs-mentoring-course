import { UsersControllerTypes } from '@root/src/controllers/users';
import { UsersServiceTypes } from '@root/src/services/users';
import { UsersValidationSchemaTypes } from '@root/src/validation-schemas/users';
import { UsersDALTypes } from 'src/dal/users';

import TUserUpdateAttributes = UsersDALTypes.TUserUpdateAttributes;

export type CreateUserSchema = UsersServiceTypes.CreationData;

export type GetUserSchema = {
    id: string;
};

export type UpdateUserSchema = TUserUpdateAttributes;

export type DeleteUserSchema = {
    id: string;
};

export interface ValidationMethods {
    createUser: UsersControllerTypes.Controller['createUser'];
    getUser: UsersControllerTypes.Controller['getUser'];
    getUsers: UsersControllerTypes.Controller['getUsers'];
    updateUser: UsersControllerTypes.Controller['updateUser'];
    deleteUser: UsersControllerTypes.Controller['deleteUser'];
}

export interface Validation extends ValidationMethods {
    schema: UsersValidationSchemaTypes.Schema;
}

