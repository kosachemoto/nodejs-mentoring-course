export interface IUserDomain {
    id: string;
    login: string;
    password: string;
    age: number;
    isDeleted: boolean;
}

export type TUserDomainCreationData = IUserDomain;

export interface IUserDomainConstructor {
    new(data: TUserDomainCreationData): IUserDomain;
}