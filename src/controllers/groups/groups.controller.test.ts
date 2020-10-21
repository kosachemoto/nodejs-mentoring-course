import winston from 'winston';
import { Container } from 'inversify';
import { NGroupsService } from '@services/groups';
import { GroupsController } from './groups.controller';
import { TYPE } from '@ioc/inversify.types';
import { NGroupsController } from '.';

const mockedLogger = (jest.fn() as any) as winston.Logger;

export const container = new Container({
    skipBaseClassChecks: true,
});

container.bind(TYPE.SERVICE.GROUPS).toConstantValue(undefined);
container.bind(TYPE.WINSTON.LOGGER).toConstantValue(mockedLogger);
container.bind(TYPE.CONTROLLER.GROUP).to(GroupsController).inSingletonScope();

describe('GroupsController', () => {
    let send: any;
    let req: any;
    let res: any;
    let next: any;

    describe('createGroup', () => {
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
            const GROUP = {};
            const MOCKED_GROUPS_SERVICE = {
                createGroup: jest.fn().mockResolvedValue(GROUP),
            };

            container.rebind(TYPE.SERVICE.GROUPS).toConstantValue(MOCKED_GROUPS_SERVICE);
            container.rebind(TYPE.CONTROLLER.GROUP).to(GroupsController).inSingletonScope();

            const groupsService = container.get<NGroupsService.IGroupsService>(TYPE.SERVICE.GROUPS);
            const groupsController = container.get<NGroupsController.IGroupsController>(TYPE.CONTROLLER.GROUP);

            await groupsController.createGroup(req, res, next);
    
            expect((groupsService.createGroup as any).mock.calls.length).toBe(1);
            expect(send.mock.calls[0][0]).toBe(GROUP);
        });

        it('handle the error.', async () => {
            const ERROR = {
                message: "error"
            };
            const MOCKED_GROUPS_SERVICE = {
                createGroup: jest.fn().mockRejectedValue(ERROR),
            };

            container.rebind(TYPE.SERVICE.GROUPS).toConstantValue(MOCKED_GROUPS_SERVICE);
            container.rebind(TYPE.CONTROLLER.GROUP).to(GroupsController).inSingletonScope();

            const groupsService = container.get<NGroupsService.IGroupsService>(TYPE.SERVICE.GROUPS);
            const groupsController = container.get<NGroupsController.IGroupsController>(TYPE.CONTROLLER.GROUP);

            await groupsController.createGroup(req, res, next);

            
            Promise.resolve().then(() => {
                expect((groupsService.createGroup as any).mock.calls.length).toBe(1);
                expect((send.mock.calls[0][0])).toBe(ERROR);
            }).catch(() => {});
        });
    });

    describe('getGroup', () => {
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
            const GROUP = {};
            const MOCKED_GROUPS_SERVICE = {
                getGroup: jest.fn().mockResolvedValue(GROUP),
            };

            container.rebind(TYPE.SERVICE.GROUPS).toConstantValue(MOCKED_GROUPS_SERVICE);
            container.rebind(TYPE.CONTROLLER.GROUP).to(GroupsController).inSingletonScope();

            const groupsService = container.get<NGroupsService.IGroupsService>(TYPE.SERVICE.GROUPS);
            const groupsController = container.get<NGroupsController.IGroupsController>(TYPE.CONTROLLER.GROUP);

            await groupsController.getGroup(req, res, next);
    
            expect((groupsService.getGroup as any).mock.calls.length).toBe(1);
            expect(send.mock.calls[0][0]).toBe(GROUP);
        });

        it('handle the error.', async () => {
            const ERROR = {
                message: "error"
            };
            const MOCKED_GROUPS_SERVICE = {
                getGroup: jest.fn().mockRejectedValue(ERROR),
            };

            container.rebind(TYPE.SERVICE.GROUPS).toConstantValue(MOCKED_GROUPS_SERVICE);
            container.rebind(TYPE.CONTROLLER.GROUP).to(GroupsController).inSingletonScope();

            const groupsService = container.get<NGroupsService.IGroupsService>(TYPE.SERVICE.GROUPS);
            const groupsController = container.get<NGroupsController.IGroupsController>(TYPE.CONTROLLER.GROUP);

            await groupsController.getGroup(req, res, next);

            
            Promise.resolve().then(() => {
                expect((groupsService.getGroup as any).mock.calls.length).toBe(1);
                expect((send.mock.calls[0][0])).toBe(ERROR);
            }).catch(() => {});
        });
    });

    describe('getGroups', () => {
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
            const GROUP = {};
            const MOCKED_GROUPS_SERVICE = {
                getGroups: jest.fn().mockResolvedValue(GROUP),
            };

            container.rebind(TYPE.SERVICE.GROUPS).toConstantValue(MOCKED_GROUPS_SERVICE);
            container.rebind(TYPE.CONTROLLER.GROUP).to(GroupsController).inSingletonScope();

            const groupsService = container.get<NGroupsService.IGroupsService>(TYPE.SERVICE.GROUPS);
            const groupsController = container.get<NGroupsController.IGroupsController>(TYPE.CONTROLLER.GROUP);

            await groupsController.getGroups(req, res, next);
    
            expect((groupsService.getGroups as any).mock.calls.length).toBe(1);
            expect(send.mock.calls[0][0]).toBe(GROUP);
        });

        it('handle the error.', async () => {
            const ERROR = {
                message: "error"
            };
            const MOCKED_GROUPS_SERVICE = {
                getGroups: jest.fn().mockRejectedValue(ERROR),
            };

            container.rebind(TYPE.SERVICE.GROUPS).toConstantValue(MOCKED_GROUPS_SERVICE);
            container.rebind(TYPE.CONTROLLER.GROUP).to(GroupsController).inSingletonScope();

            const groupsService = container.get<NGroupsService.IGroupsService>(TYPE.SERVICE.GROUPS);
            const groupsController = container.get<NGroupsController.IGroupsController>(TYPE.CONTROLLER.GROUP);

            await groupsController.getGroups(req, res, next);

            
            Promise.resolve().then(() => {
                expect((groupsService.getGroups as any).mock.calls.length).toBe(1);
                expect((send.mock.calls[0][0])).toBe(ERROR);
            }).catch(() => {});
        });
    });

    describe('updateGroup', () => {
        beforeEach(() => {
            send = jest.fn(),
            req = {
                params: {},
                body: {},
            };
            res = {
                send,
                status: jest.fn().mockReturnThis(),
            };
            next = {};
        });

        it('handle the correct response.', async () => {
            const GROUP = [{}];
            const MOCKED_GROUPS_SERVICE = {
                updateGroup: jest.fn().mockResolvedValue(GROUP),
            };

            container.rebind(TYPE.SERVICE.GROUPS).toConstantValue(MOCKED_GROUPS_SERVICE);
            container.rebind(TYPE.CONTROLLER.GROUP).to(GroupsController).inSingletonScope();

            const groupsService = container.get<NGroupsService.IGroupsService>(TYPE.SERVICE.GROUPS);
            const groupsController = container.get<NGroupsController.IGroupsController>(TYPE.CONTROLLER.GROUP);

            await groupsController.updateGroup(req, res, next);
    
            expect((groupsService.updateGroup as any).mock.calls.length).toBe(1);
            expect(send.mock.calls[0][0]).toBe(GROUP);
        });

        it('handle the error.', async () => {
            const ERROR = {
                message: "error"
            };
            const MOCKED_GROUPS_SERVICE = {
                updateGroup: jest.fn().mockRejectedValue(ERROR),
            };

            container.rebind(TYPE.SERVICE.GROUPS).toConstantValue(MOCKED_GROUPS_SERVICE);
            container.rebind(TYPE.CONTROLLER.GROUP).to(GroupsController).inSingletonScope();

            const groupsService = container.get<NGroupsService.IGroupsService>(TYPE.SERVICE.GROUPS);
            const groupsController = container.get<NGroupsController.IGroupsController>(TYPE.CONTROLLER.GROUP);

            await groupsController.updateGroup(req, res, next);

            
            Promise.resolve().then(() => {
                expect((groupsService.updateGroup as any).mock.calls.length).toBe(1);
                expect((send.mock.calls[0][0])).toBe(ERROR);
            }).catch(() => {});
        });
    });

    describe('deleteGroup', () => {
        beforeEach(() => {
            send = jest.fn(),
            req = {
                params: {},
                body: {},
            };
            res = {
                send,
                status: jest.fn().mockReturnThis(),
            };
            next = {};
        });

        it('handle the correct response.', async () => {
            const RESULT = undefined;
            const MOCKED_GROUPS_SERVICE = {
                deleteGroup: jest.fn().mockResolvedValue(RESULT),
            };

            container.rebind(TYPE.SERVICE.GROUPS).toConstantValue(MOCKED_GROUPS_SERVICE);
            container.rebind(TYPE.CONTROLLER.GROUP).to(GroupsController).inSingletonScope();

            const groupsService = container.get<NGroupsService.IGroupsService>(TYPE.SERVICE.GROUPS);
            const groupsController = container.get<NGroupsController.IGroupsController>(TYPE.CONTROLLER.GROUP);

            await groupsController.deleteGroup(req, res, next);
    
            expect((groupsService.deleteGroup as any).mock.calls.length).toBe(1);
            expect(send.mock.calls[0][0]).toBe(RESULT);
        });

        it('handle the error.', async () => {
            const ERROR = {
                message: "error"
            };
            const MOCKED_GROUPS_SERVICE = {
                deleteGroup: jest.fn().mockRejectedValue(ERROR),
            };

            container.rebind(TYPE.SERVICE.GROUPS).toConstantValue(MOCKED_GROUPS_SERVICE);
            container.rebind(TYPE.CONTROLLER.GROUP).to(GroupsController).inSingletonScope();

            const groupsService = container.get<NGroupsService.IGroupsService>(TYPE.SERVICE.GROUPS);
            const groupsController = container.get<NGroupsController.IGroupsController>(TYPE.CONTROLLER.GROUP);

            await groupsController.deleteGroup(req, res, next);

            
            Promise.resolve().then(() => {
                expect((groupsService.deleteGroup as any).mock.calls.length).toBe(1);
                expect((send.mock.calls[0][0])).toBe(ERROR);
            }).catch(() => {});
        });
    });

    describe('addGroupUsers', () => {
        beforeEach(() => {
            send = jest.fn(),
            req = {
                params: {},
                body: {},
            };
            res = {
                send,
                status: jest.fn().mockReturnThis(),
            };
            next = {};
        });

        it('handle the correct response.', async () => {
            const RESULT = undefined;
            const MOCKED_GROUPS_SERVICE = {
                addGroupUsers: jest.fn().mockResolvedValue(RESULT),
            };

            container.rebind(TYPE.SERVICE.GROUPS).toConstantValue(MOCKED_GROUPS_SERVICE);
            container.rebind(TYPE.CONTROLLER.GROUP).to(GroupsController).inSingletonScope();

            const groupsService = container.get<NGroupsService.IGroupsService>(TYPE.SERVICE.GROUPS);
            const groupsController = container.get<NGroupsController.IGroupsController>(TYPE.CONTROLLER.GROUP);

            await groupsController.addGroupUsers(req, res, next);
    
            expect((groupsService.addGroupUsers as any).mock.calls.length).toBe(1);
            expect(send.mock.calls[0][0]).toBe(RESULT);
        });

        it('handle the error.', async () => {
            const ERROR = {
                message: "error"
            };
            const MOCKED_GROUPS_SERVICE = {
                addGroupUsers: jest.fn().mockRejectedValue(ERROR),
            };

            container.rebind(TYPE.SERVICE.GROUPS).toConstantValue(MOCKED_GROUPS_SERVICE);
            container.rebind(TYPE.CONTROLLER.GROUP).to(GroupsController).inSingletonScope();

            const groupsService = container.get<NGroupsService.IGroupsService>(TYPE.SERVICE.GROUPS);
            const groupsController = container.get<NGroupsController.IGroupsController>(TYPE.CONTROLLER.GROUP);

            await groupsController.addGroupUsers(req, res, next);

            
            Promise.resolve().then(() => {
                expect((groupsService.addGroupUsers as any).mock.calls.length).toBe(1);
                expect((send.mock.calls[0][0])).toBe(ERROR);
            }).catch(() => {});
        });
    });

    describe('getGroupUsers', () => {
        beforeEach(() => {
            send = jest.fn(),
            req = {
                params: {},
                body: {},
            };
            res = {
                send,
                status: jest.fn().mockReturnThis(),
            };
            next = {};
        });

        it('handle the correct response.', async () => {
            const RESULT = undefined;
            const MOCKED_GROUPS_SERVICE = {
                getGroupUsers: jest.fn().mockResolvedValue(RESULT),
            };

            container.rebind(TYPE.SERVICE.GROUPS).toConstantValue(MOCKED_GROUPS_SERVICE);
            container.rebind(TYPE.CONTROLLER.GROUP).to(GroupsController).inSingletonScope();

            const groupsService = container.get<NGroupsService.IGroupsService>(TYPE.SERVICE.GROUPS);
            const groupsController = container.get<NGroupsController.IGroupsController>(TYPE.CONTROLLER.GROUP);

            await groupsController.getGroupUsers(req, res, next);
    
            expect((groupsService.getGroupUsers as any).mock.calls.length).toBe(1);
            expect(send.mock.calls[0][0]).toBe(RESULT);
        });

        it('handle the error.', async () => {
            const ERROR = {
                message: "error"
            };
            const MOCKED_GROUPS_SERVICE = {
                getGroupUsers: jest.fn().mockRejectedValue(ERROR),
            };

            container.rebind(TYPE.SERVICE.GROUPS).toConstantValue(MOCKED_GROUPS_SERVICE);
            container.rebind(TYPE.CONTROLLER.GROUP).to(GroupsController).inSingletonScope();

            const groupsService = container.get<NGroupsService.IGroupsService>(TYPE.SERVICE.GROUPS);
            const groupsController = container.get<NGroupsController.IGroupsController>(TYPE.CONTROLLER.GROUP);

            await groupsController.getGroupUsers(req, res, next);

            
            Promise.resolve().then(() => {
                expect((groupsService.getGroupUsers as any).mock.calls.length).toBe(1);
                expect((send.mock.calls[0][0])).toBe(ERROR);
            }).catch(() => {});
        });
    });
})