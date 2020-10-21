import winston from 'winston';
import { Container } from 'inversify';
import { NUsersService } from 'src/services/users';
import { UsersController } from './users.controller';
import { TYPE } from '@ioc/inversify.types';
import { NUsersController } from '.';

jest.mock('src/services/users');

const mockedLogger = (jest.fn() as any) as winston.Logger;

export const container = new Container({
    skipBaseClassChecks: true,
});

container.bind(TYPE.SERVICE.USERS).toConstantValue(undefined);
container.bind(TYPE.WINSTON.LOGGER).toConstantValue(mockedLogger);
container.bind(TYPE.CONTROLLER.USER).to(UsersController).inSingletonScope();

describe('UsersController', () => {
    let send: any;
    let req: any;
    let res: any;
    let next: any;

    describe('createUser', () => {
        beforeEach(() => {
            send = jest.fn(),
            req = {};
            res = {
                send,
                status: jest.fn().mockReturnThis(),
            };
            next = {};
        });

        it('handle the correct response.', async () => {
            const USER = {};
            const MOCKED_USER_SERVICE = {
                createUser: jest.fn().mockResolvedValue(USER),
            };

            container.rebind(TYPE.SERVICE.USERS).toConstantValue(MOCKED_USER_SERVICE);
            container.rebind(TYPE.CONTROLLER.USER).to(UsersController).inSingletonScope();

            const usersService = container.get<NUsersService.IUsersService>(TYPE.SERVICE.USERS);
            const usersController = container.get<NUsersController.IUsersController>(TYPE.CONTROLLER.USER);

            await usersController.createUser(req, res, next);
    
            expect((usersService.createUser as any).mock.calls.length).toBe(1);
            expect(send.mock.calls[0][0]).toBe(USER);
        });

        it('handle the error.', async () => {
            const ERROR = {
                message: "error"
            };
            const MOCKED_USER_SERVICE = {
                createUser: jest.fn().mockRejectedValue(ERROR),
            };

            container.rebind(TYPE.SERVICE.USERS).toConstantValue(MOCKED_USER_SERVICE);
            container.rebind(TYPE.CONTROLLER.USER).to(UsersController).inSingletonScope();

            const usersService = container.get<NUsersService.IUsersService>(TYPE.SERVICE.USERS);
            const usersController = container.get<NUsersController.IUsersController>(TYPE.CONTROLLER.USER);

            await usersController.createUser(req, res, next);

            
            Promise.resolve().then(() => {
                expect((usersService.createUser as any).mock.calls.length).toBe(1);
                expect((send.mock.calls[0][0])).toBe(ERROR);
            }).catch(() => {});
        });
    });
    
    describe('getUser', () => {
        beforeEach(() => {
            send = jest.fn(),
            req = {
                params: {},
            };
            res = {
                send,
                status: jest.fn().mockReturnThis(),
            };
            next = {};
        });

        it('handle the correct response.', async () => {
            const USER = {};
            const MOCKED_USER_SERVICE = {
                getUser: {
                    byId: jest.fn().mockResolvedValue(USER),
                },
            };

            container.rebind(TYPE.SERVICE.USERS).toConstantValue(MOCKED_USER_SERVICE);
            container.rebind(TYPE.CONTROLLER.USER).to(UsersController).inSingletonScope();

            const usersService = container.get<NUsersService.IUsersService>(TYPE.SERVICE.USERS);
            const usersController = container.get<NUsersController.IUsersController>(TYPE.CONTROLLER.USER);

            await usersController.getUser(req, res, next);
    
            expect((usersService.getUser.byId as any).mock.calls.length).toBe(1);
            expect(send.mock.calls[0][0]).toBe(USER);
        });

        it('handle the error.', async () => {
            const ERROR = {
                message: "error"
            };
            const MOCKED_USER_SERVICE = {
                getUser: {
                    byId: jest.fn().mockRejectedValue(ERROR),
                },
            };

            container.rebind(TYPE.SERVICE.USERS).toConstantValue(MOCKED_USER_SERVICE);
            container.rebind(TYPE.CONTROLLER.USER).to(UsersController).inSingletonScope();

            const usersService = container.get<NUsersService.IUsersService>(TYPE.SERVICE.USERS);
            const usersController = container.get<NUsersController.IUsersController>(TYPE.CONTROLLER.USER);

            await usersController.getUser(req, res, next);

            
            Promise.resolve().then(() => {
                expect((usersService.getUser.byId as any).mock.calls.length).toBe(1);
                expect((send.mock.calls[0][0])).toBe(ERROR);
            }).catch(() => {});
        });
    });

    describe('getUsers', () => {
        beforeEach(() => {
            send = jest.fn(),
            req = {
                query: {},
            };
            res = {
                send,
                status: jest.fn().mockReturnThis(),
            };
            next = {};
        });

        it('handle the correct response.', async () => {
            const USERS = [{}];
            const MOCKED_USER_SERVICE = {
                getUsers: jest.fn().mockResolvedValue(USERS),
            };

            container.rebind(TYPE.SERVICE.USERS).toConstantValue(MOCKED_USER_SERVICE);
            container.rebind(TYPE.CONTROLLER.USER).to(UsersController).inSingletonScope();

            const usersService = container.get<NUsersService.IUsersService>(TYPE.SERVICE.USERS);
            const usersController = container.get<NUsersController.IUsersController>(TYPE.CONTROLLER.USER);

            await usersController.getUsers(req, res, next);
    
            expect((usersService.getUsers as any).mock.calls.length).toBe(1);
            expect(send.mock.calls[0][0]).toBe(USERS);
        });

        it('handle the error.', async () => {
            const ERROR = {
                message: "error"
            };
            const MOCKED_USER_SERVICE = {
                getUsers: jest.fn().mockRejectedValue(ERROR),
            };

            container.rebind(TYPE.SERVICE.USERS).toConstantValue(MOCKED_USER_SERVICE);
            container.rebind(TYPE.CONTROLLER.USER).to(UsersController).inSingletonScope();

            const usersService = container.get<NUsersService.IUsersService>(TYPE.SERVICE.USERS);
            const usersController = container.get<NUsersController.IUsersController>(TYPE.CONTROLLER.USER);

            await usersController.getUsers(req, res, next);

            
            Promise.resolve().then(() => {
                expect((usersService.getUsers as any).mock.calls.length).toBe(1);
                expect((send.mock.calls[0][0])).toBe(ERROR);
            }).catch(() => {});
        });
    });

    describe('updateUser', () => {
        beforeEach(() => {
            send = jest.fn(),
            req = {
                params: {},
                query: {},
            };
            res = {
                send,
                status: jest.fn().mockReturnThis(),
            };
            next = {};
        });

        it('handle the correct response.', async () => {
            const USERS = {};
            const MOCKED_USER_SERVICE = {
                updateUser: jest.fn().mockResolvedValue(USERS),
            };

            container.rebind(TYPE.SERVICE.USERS).toConstantValue(MOCKED_USER_SERVICE);
            container.rebind(TYPE.CONTROLLER.USER).to(UsersController).inSingletonScope();

            const usersService = container.get<NUsersService.IUsersService>(TYPE.SERVICE.USERS);
            const usersController = container.get<NUsersController.IUsersController>(TYPE.CONTROLLER.USER);

            await usersController.updateUser(req, res, next);
    
            expect((usersService.updateUser as any).mock.calls.length).toBe(1);
            expect(send.mock.calls[0][0]).toBe(USERS);
        });

        it('handle the error.', async () => {
            const ERROR = {
                message: "error"
            };
            const MOCKED_USER_SERVICE = {
                updateUser: jest.fn().mockRejectedValue(ERROR),
            };

            container.rebind(TYPE.SERVICE.USERS).toConstantValue(MOCKED_USER_SERVICE);
            container.rebind(TYPE.CONTROLLER.USER).to(UsersController).inSingletonScope();

            const usersService = container.get<NUsersService.IUsersService>(TYPE.SERVICE.USERS);
            const usersController = container.get<NUsersController.IUsersController>(TYPE.CONTROLLER.USER);

            await usersController.updateUser(req, res, next);

            
            Promise.resolve().then(() => {
                expect((usersService.updateUser as any).mock.calls.length).toBe(1);
                expect((send.mock.calls[0][0])).toBe(ERROR);
            }).catch(() => {});
        });
    });

    describe('deleteUser', () => {
        beforeEach(() => {
            send = jest.fn(),
            req = {
                params: {},
            };
            res = {
                send,
                status: jest.fn().mockReturnThis(),
            };
            next = {};
        });

        it('handle the correct response.', async () => {
            const RESULT = undefined;
            const MOCKED_USER_SERVICE = {
                deleteUser: jest.fn().mockResolvedValue(RESULT),
            };

            container.rebind(TYPE.SERVICE.USERS).toConstantValue(MOCKED_USER_SERVICE);
            container.rebind(TYPE.CONTROLLER.USER).to(UsersController).inSingletonScope();

            const usersService = container.get<NUsersService.IUsersService>(TYPE.SERVICE.USERS);
            const usersController = container.get<NUsersController.IUsersController>(TYPE.CONTROLLER.USER);

            await usersController.deleteUser(req, res, next);
    
            expect((usersService.deleteUser as any).mock.calls.length).toBe(1);
            expect(send.mock.calls[0][0]).toBe(RESULT);
        });

        it('handle the error.', async () => {
            const RESULT = undefined;
            const MOCKED_USER_SERVICE = {
                deleteUser: jest.fn().mockRejectedValue(RESULT),
            };

            container.rebind(TYPE.SERVICE.USERS).toConstantValue(MOCKED_USER_SERVICE);
            container.rebind(TYPE.CONTROLLER.USER).to(UsersController).inSingletonScope();

            const usersService = container.get<NUsersService.IUsersService>(TYPE.SERVICE.USERS);
            const usersController = container.get<NUsersController.IUsersController>(TYPE.CONTROLLER.USER);

            await usersController.deleteUser(req, res, next);

            
            Promise.resolve().then(() => {
                expect((usersService.deleteUser as any).mock.calls.length).toBe(1);
                expect((send.mock.calls[0][0])).toBe(RESULT);
            }).catch(() => {});
        });
    });
})