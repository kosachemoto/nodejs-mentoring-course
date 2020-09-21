import 'reflect-metadata';
import { Container } from 'inversify';
import { TYPE } from './inversify.types';

import { DataTypes } from 'sequelize';
import { options, OverloadedSequelize } from 'src/orm';
import {
    UserDAL,
    UserDomain,
    UserDTO,
} from '@models/user';
import { UserDataMapper } from '@data-mappers/user';
import { UsersDAL } from '@dal/users';
import { UsersService } from '@services/users';
import { UsersController } from '@controllers/users';
import { usersValidationSchema } from 'src/validation-schemas/users';
import { UsersValidation } from 'src/validation/users';

export const container = new Container({
    skipBaseClassChecks: true,
});

container.bind(TYPE.ORM.DB_OPTIONS).toConstantValue(options);
container.bind(TYPE.ORM.DATA_TYPES).toConstantValue(DataTypes);
container.bind(TYPE.ORM.SEQUELIZE).to(OverloadedSequelize).inSingletonScope();

container.bind(TYPE.MODEL.DAL.USER).to(UserDAL).inSingletonScope();
container.bind(TYPE.MODEL.DOMAIN.USER).toConstantValue(UserDomain);
container.bind(TYPE.MODEL.DTO.USER).toConstantValue(UserDTO);

container.bind(TYPE.DATA_MAPPER.USER).to(UserDataMapper).inSingletonScope();

container.bind(TYPE.DAL.USERS).to(UsersDAL).inSingletonScope();

container.bind(TYPE.SERVICE.USERS).to(UsersService).inSingletonScope();
container.bind(TYPE.CONTROLLER.USER).to(UsersController).inSingletonScope();

container.bind(TYPE.VALIDATION.SCHEMA.USER).toConstantValue(usersValidationSchema);
container.bind(TYPE.VALIDATION.RULES.USER).to(UsersValidation).inSingletonScope();