import { UserDALModelTypes, UserDomainModelTypes } from '@root/src/models/user';

import IUserDALModel = UserDALModelTypes.IUserDALModel;
import IUserDALModelConstructor = UserDALModelTypes.IUserDALModelConstructor;
import IUserDomainModel = UserDomainModelTypes.IUserDomainModel;
import IUserDomainModelConstructor = UserDomainModelTypes.IUserDomainModelConstructor;

export interface IUserDataMapper {
    toDomain(userModel: IUserDALModel): IUserDomainModel;
    toDAL(userModel: IUserDomainModel): IUserDALModel;
}

export interface IUserDataMapperConstructor {
    new(
        UserDALModel: IUserDALModelConstructor,
        UserDomainModel: IUserDomainModelConstructor,
    ): IUserDataMapper;
}