export type User = {
    id: string;
    login: string;
    password: string;
    age: string;
    isDeleted: boolean;
}

export type CreateData = Omit<User, 'id' | 'isDeleted'>;

export type UpdateData = Pick<User, 'id'> & Partial<Omit<User, 'id' | 'isDeleted'>>;

export interface ServiceMethods {
    createUser: (data: CreateData) => void;
    getUser: (id: string) => User;
    getUsers: () => User[];
    updateUser: (data: UpdateData) => void;
    deleteUser: (id: string) => void;
    getAutoSuggestUsers: (loginSubstring: string, limit?: number) => User[];
}

export interface Service extends ServiceMethods {
    users: User[];
}
