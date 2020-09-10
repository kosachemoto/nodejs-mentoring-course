export namespace UsersServiceTypes {
    export type User = {
        id: string;
        login: string;
        password: string;
        age: string;
        isDeleted: boolean;
    }

    export type SaveData = Omit<User, 'id' | 'isDeleted'>;

    export type UpdateData = Pick<User, 'id'> & Partial<Omit<User, 'id' | 'isDeleted'>>;

    export interface Service {
        users: User[];
        createUser: (data: SaveData) => void;
        getUser: (id: string) => User;
        getUsers: () => User[];
        updateUser: (data: UpdateData) => void;
        deleteUser: (id: string) => void;
        getAutoSuggestUsers: (loginSubstring: string, limit?: number) => User[];
    };
};
