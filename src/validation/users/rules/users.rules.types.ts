import { NUsersController } from '@controllers/users';

import IUsersController = NUsersController.IUsersController;

export interface IUsersRules {
    createUser: IUsersController['createUser'];
    getUser: IUsersController['getUser'];
    getUsers: IUsersController['getUsers'];
    updateUser: IUsersController['updateUser'];
    deleteUser: IUsersController['deleteUser'];
}