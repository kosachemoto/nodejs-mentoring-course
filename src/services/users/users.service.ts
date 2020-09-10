import { v4 } from 'uuid';
import { UsersServiceTypes } from './users.service.types';

export class UsersService implements UsersServiceTypes.Service {
    users: UsersServiceTypes.User[] = [];

    createUser(data: UsersServiceTypes.SaveData) {
        const newUser: UsersServiceTypes.User = {
            ...data,
            id: v4(),
            isDeleted: false,
        };

        this.users.push(newUser);
    }

    getUser(id: string) {
        const user = this.users.find((user) => user.id === id && !user.isDeleted);

        if (user === undefined) {
            throw(new Error(`User with { id: \"${id}\" } doesn't exist.`));
        }

        return user;
    }

    getUsers() {
        return this.users;
    }

    updateUser(data: UsersServiceTypes.UpdateData) {
        const {
            id,
            ...restData
        } = data;

        const userIndex = this.users.findIndex((user) => user.id === id && !user.isDeleted);

        if (userIndex === undefined) {
            throw(new Error(`User with { id: \"${id}\" } doesn't exist.`));
        }

        this.users[userIndex] = {
            ...this.users[userIndex],
            ...restData,
        }
    };

    deleteUser(id: string) {
        const userIndex = this.users.findIndex((user) => user.id === id && !user.isDeleted);

        if (userIndex === undefined) {
            throw(new Error(`User with { id: \"${id}\" } doesn't exist.`));
        }

        this.users[userIndex].isDeleted = true;
    };

    getAutoSuggestUsers = (loginSubstring: string, limit?: number) => {
        const suggestedUsers = this.users.filter(({ isDeleted, login }) => !isDeleted && login.includes(loginSubstring));

        if (limit === null && limit === undefined) {
            return suggestedUsers;
        }

        return suggestedUsers.slice(0, limit);
    };
};
