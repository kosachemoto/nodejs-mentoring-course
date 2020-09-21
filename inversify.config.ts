import 'reflect-metadata';
import { Container } from 'inversify';
import { TYPES } from './inversify.types';

import { DataTypes } from 'sequelize';
import { options, OverloadedSequelize } from './src/orm';
import { 
    UserDALModel,
    UserDomainModel,
    UserORMModel,
} from './src/models/user';
import { UserDataMapper } from '@root/src/data-mappers/user';
import { UsersDAL } from './src/dal/users';
import { UserRepository } from './src/repositories/users';
import { UsersService } from './src/services/users';
import { UsersController } from './src/controllers/users';
import { usersValidationSchema } from './src/validation-schemas/users';
import { UsersValidation } from './src/validation/users';

export const container = new Container({
    skipBaseClassChecks: true,
});

container.bind(TYPES.ORM.DB_OPTIONS).toConstantValue(options);
container.bind(TYPES.ORM.DATA_TYPES).toConstantValue(DataTypes);
container.bind(TYPES.ORM.SEQUELIZE).to(OverloadedSequelize).inSingletonScope();

container.bind(TYPES.MODELS.DAL.USER).toConstantValue(UserDALModel);
container.bind(TYPES.MODELS.DOMAIN.USER).toConstantValue(UserDomainModel);
container.bind(TYPES.MODELS.ORM.USER).to(UserORMModel).inSingletonScope();

container.bind(TYPES.DATA_MAPPER.USER).to(UserDataMapper).inSingletonScope();

container.bind(TYPES.DAL.USERS).to(UsersDAL).inSingletonScope();

container.bind(TYPES.REPOSITORIES.USERS).to(UserRepository).inSingletonScope();

container.bind(TYPES.USERS.SERVICE).to(UsersService).inSingletonScope();
container.bind(TYPES.USERS.CONTROLLER).to(UsersController).inSingletonScope();
container.bind(TYPES.USERS.SCHEMA).toConstantValue(usersValidationSchema);
container.bind(TYPES.USERS.VALIDATION).to(UsersValidation).inSingletonScope();