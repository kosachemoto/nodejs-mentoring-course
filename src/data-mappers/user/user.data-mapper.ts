import "reflect-metadata";
import { injectable, inject } from 'inversify';
import { TYPES } from "@root/inversify.types";
import {
    UserDALModelTypes,
    UserDomainModelTypes,
 } from "@root/src/models/user";

import IUserDALModel = UserDALModelTypes.IUserDALModel;
import IUserDALModelConstructor = UserDALModelTypes.IUserDALModelConstructor;
import IUserDomainModel = UserDomainModelTypes.IUserDomainModel;
import IUserDomainModelConstructor = UserDomainModelTypes.IUserDomainModelConstructor;;


@injectable()
export class UserDataMapper {
    UserDALModel: IUserDALModelConstructor;
    UserDomainModel: IUserDomainModelConstructor;

    constructor(
        @inject(TYPES.MODELS.DAL.USER) UserDALModel: IUserDALModelConstructor,
        @inject(TYPES.MODELS.DOMAIN.USER) UserDomainModel: IUserDomainModelConstructor,
    ) {
        this.UserDALModel = UserDALModel;
        this.UserDomainModel = UserDomainModel;
    }

    toDomain = (DALUser: IUserDALModel) => {
        return new this.UserDomainModel(DALUser);
    }

    toDAL = (DomainUser: IUserDomainModel) => {
        return new this.UserDALModel(DomainUser);
    }
}