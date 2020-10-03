import "reflect-metadata";
import { injectable, inject } from 'inversify';
import { TYPE } from "@ioc/inversify.types";
import {
    NUserDAL,
    NUserDomain,
    NUserDTO,
} from "@models/user";
import { DataMappingError } from 'src/utils';
import { IUserDataMapper } from './user.data-mapper.types';

import TUserDAL = NUserDAL.TUserDAL;
import IUserDAL = NUserDAL.IUserDAL;
import IUserDomain = NUserDomain.IUserDomain;
import IUserDomainConstructor = NUserDomain.IUserDomainConstructor;
import IUserDTO = NUserDTO.IUserDTO;
import IUserDTOConstructor = NUserDTO.IUserDTOConstructor;

@injectable()
export class UserDataMapper implements IUserDataMapper {
    userDAL: IUserDAL;
    UserDomain: IUserDomainConstructor;
    UserDTO: IUserDTOConstructor;

    constructor(
        @inject(TYPE.MODEL.DAL.USER) userDAL: IUserDAL, 
        @inject(TYPE.MODEL.DOMAIN.USER) UserDomain: IUserDomainConstructor,
        @inject(TYPE.MODEL.DTO.USER) UserDTO: IUserDTOConstructor,
    ) {
        this.userDAL = userDAL;
        this.UserDomain = UserDomain;
        this.UserDTO = UserDTO;
    }

    private isDAL = (instance: any): instance is TUserDAL => {
        return instance instanceof this.userDAL;
    } 

    private isDomain = (instance: any): instance is IUserDomain => {
        return instance instanceof this.UserDomain;
    }
    
    private isDTO = (instance: any): instance is IUserDTO => {
        return instance instanceof this.UserDTO;
    }
    
    toDomain = (user: any) => {
        if (this.isDAL(user)) {
            return new this.UserDomain(user);
        }

        if (this.isDTO(user)) {
            return new this.UserDomain(user);
        }

        throw new DataMappingError(`Can't map "user" to domain model.`);
    }

    toDTO = (user: any) => {
        if (this.isDAL(user)) {
            return new this.UserDTO(user);
        }

        if (this.isDomain(user)) {
            return new this.UserDTO(user);
        }

        throw new DataMappingError(`Can't map "user" to DTO model.`);
    }
}