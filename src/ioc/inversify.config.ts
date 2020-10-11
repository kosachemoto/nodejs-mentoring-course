import 'reflect-metadata';
import { Container } from 'inversify';
import { TYPE } from './inversify.types';

import { DataTypes } from 'sequelize';
import { applicationMode } from 'src/commander';
import { options, OverloadedSequelize } from 'src/orm';
import {
    UserDAL,
    NUserDAL,
    UserDomain,
    UserDTO,
} from '@models/user';
import {
    GroupDAL,
    GroupDTO,
    NGroupDAL,
} from '@models/group';
import { UserDataMapper } from '@data-mappers/user';
import { UsersDAL } from '@dal/users';
import { GroupsDAL } from '@dal/groups';
import { UsersService } from '@services/users';
import { GroupsService } from '@services/groups';
import { UsersController } from '@controllers/users';
import { GroupsController } from '@controllers/groups';
import { 
    UsersRules,
    UsersSchema,
} from 'src/validation/users';

import IUserDAL = NUserDAL.IUserDAL;
import IGroupDAL = NGroupDAL.IGroupDAL;

export const container = new Container({
    skipBaseClassChecks: true,
});

container.bind(TYPE.APPLICATION.MODE).toConstantValue(applicationMode);
container.bind(TYPE.WINSTON.LOGGER).to(WinstonLogger).inSingletonScope();
container.bind(TYPE.WINSTON.STREAM).to(WinstonStream).inSingletonScope();

container.bind(TYPE.ORM.DB_OPTIONS).toConstantValue(options);
container.bind(TYPE.ORM.DATA_TYPES).toConstantValue(DataTypes);
container.bind(TYPE.ORM.SEQUELIZE).to(OverloadedSequelize).inSingletonScope();

container.bind(TYPE.MODEL.DAL.USER).to(UserDAL).inSingletonScope();
container.bind(TYPE.MODEL.DOMAIN.USER).toConstantValue(UserDomain);
container.bind(TYPE.MODEL.DTO.USER).toConstantValue(UserDTO);

container.bind(TYPE.MODEL.DAL.GROUP).to(GroupDAL).inSingletonScope();
container.bind(TYPE.MODEL.DTO.GROUP).to(GroupDTO).inSingletonScope();

// TODO: сделать это как-нибудь по-нормальному
const userDAL = container.get<IUserDAL>(TYPE.MODEL.DAL.USER);
const groupDAL = container.get<IGroupDAL>(TYPE.MODEL.DAL.GROUP);

userDAL.belongsToMany(groupDAL, { through: 'User_Group' });
groupDAL.belongsToMany(userDAL, { through: 'User_Group' });

container.bind(TYPE.DATA_MAPPER.USER).to(UserDataMapper).inSingletonScope();

container.bind(TYPE.DAL.USERS).to(UsersDAL).inSingletonScope();
container.bind(TYPE.DAL.GROUPS).to(GroupsDAL).inSingletonScope();

container.bind(TYPE.SERVICE.USERS).to(UsersService).inSingletonScope();
container.bind(TYPE.SERVICE.GROUPS).to(GroupsService).inSingletonScope();

container.bind(TYPE.CONTROLLER.USER).to(UsersController).inSingletonScope();
container.bind(TYPE.CONTROLLER.GROUP).to(GroupsController).inSingletonScope();

container.bind(TYPE.VALIDATION.SCHEMA.USER).to(UsersSchema).inSingletonScope();
container.bind(TYPE.VALIDATION.RULES.USER).to(UsersRules).inSingletonScope();