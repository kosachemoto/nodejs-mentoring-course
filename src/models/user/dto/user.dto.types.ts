export interface IUserDTO {
    id: string;
    login: string;
    password: string;
    age: number;
    isDeleted: boolean;
}

export type TUserDTOCreationData = IUserDTO;

export interface IUserDTOConstructor {
    new(data: TUserDTOCreationData): IUserDTO;
}