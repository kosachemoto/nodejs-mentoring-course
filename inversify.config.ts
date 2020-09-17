import { Container } from 'inversify';
import 'reflect-metadata';
import { TYPES } from './inversify.types';

import { UsersService } from './src/services/users';
import { UsersController } from './src/controllers/users';
import { usersValidationSchema } from './src/validation-schemas/users';
import { UsersValidation } from './src/validation/users';

export const container = new Container();

container.bind(TYPES.USERS.SERVICE).to(UsersService).inSingletonScope();
container.bind(TYPES.USERS.CONTROLLER).to(UsersController).inSingletonScope();
container.bind(TYPES.USERS.SCHEMA).toConstantValue(usersValidationSchema);
container.bind(TYPES.USERS.VALIDATION).to(UsersValidation).inSingletonScope();