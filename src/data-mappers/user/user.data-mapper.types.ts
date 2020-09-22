import { NUserDomain, NUserDTO } from '@models/user';

import IUserDomain = NUserDomain.IUserDomain;
import IUserDomainConstructor = NUserDomain.IUserDomainConstructor;
import IUserDTO = NUserDTO.IUserDTO;
import IUserDTOConstructor = NUserDTO.IUserDTOConstructor;

export interface IUserDataMapper {
    toDomain(userDTO: IUserDTO): IUserDomain;
    toDTO(userDomain: IUserDomain): IUserDTO;
}

export interface IUserDataMapperConstructor {
    new(
        UserDomain: IUserDomainConstructor,
        UserDTO: IUserDTOConstructor,
    ): IUserDataMapper;
}