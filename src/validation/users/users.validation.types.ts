import { NUsersController } from '@controllers/users';
import { NUsersService } from '@services/users';
import { UsersValidationSchemaTypes } from 'src/validation-schemas/users';
import { NUsersDAL } from '@dal/users';

// import TUserUpdateAttributes = UsersDALTypes.TUserUpdateAttributes;
import IUsersController = NUsersController.IUsersController;

// export type CreateUserSchema = NUsersService.TUserCreationData;

export type GetUserSchema = {
    id: string;
};

// export type UpdateUserSchema = TUserUpdateAttributes;

export type DeleteUserSchema = {
    id: string;
};

export interface ValidationMethods {
    createUser: IUsersController['createUser'];
    getUser: IUsersController['getUser'];
    getUsers: IUsersController['getUsers'];
    updateUser: IUsersController['updateUser'];
    deleteUser: IUsersController['deleteUser'];
}

export interface Validation extends ValidationMethods {
    schema: UsersValidationSchemaTypes.Schema;
}

