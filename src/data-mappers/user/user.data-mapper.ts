import "reflect-metadata";
import { injectable, inject } from 'inversify';
import { TYPE } from "@ioc/inversify.types";
import {
    NUserDomain,
    NUserDTO,
} from "@models/user";
import { IUserDataMapper } from './user.data-mapper.types';

import IUserDomain = NUserDomain.IUserDomain;
import IUserDomainConstructor = NUserDomain.IUserDomainConstructor;
import IUserDTO = NUserDTO.IUserDTO;
import IUserDTOConstructor = NUserDTO.IUserDTOConstructor;

@injectable()
export class UserDataMapper implements IUserDataMapper {
    UserDomain: IUserDomainConstructor;
    UserDTO: IUserDTOConstructor;

    constructor(
        @inject(TYPE.MODEL.DOMAIN.USER) UserDomain: IUserDomainConstructor,
        @inject(TYPE.MODEL.DTO.USER) UserDTO: IUserDTOConstructor,
    ) {
        this.UserDomain = UserDomain;
        this.UserDTO = UserDTO;
    }

    toDomain = (userDTO: IUserDTO) => {
        return new this.UserDomain(userDTO);
    }

    toDTO = (userDomain: IUserDomain) => {
        return new this.UserDTO(userDomain);
    }
}