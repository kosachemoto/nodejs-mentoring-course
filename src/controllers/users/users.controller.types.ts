import { UsersServiceTypes } from '../../services/users';

export namespace UsersControllerTypes {
    export type GetUserProps = Pick<UsersServiceTypes.User, 'id'>;

    export type UpdateUserProps = Pick<UsersServiceTypes.User, 'id'>;

    export type UpdateUserBody = Partial<Omit<UsersServiceTypes.User, 'id'>>;

    export type DeleteUserProps = Pick<UsersServiceTypes.User, 'id'>;
}