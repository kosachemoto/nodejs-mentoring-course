import "reflect-metadata";
import { injectable, inject } from 'inversify';
import { TYPE } from '@ioc/inversify.types';
import { IGroupsController } from './groups.controller.types';
import { NGroupsService } from '@services/groups';
import { DataMappingError, UserDoesNotExist } from 'src/utils';

import IGroupsService = NGroupsService.IGroupsService;

@injectable()
export class GroupsController implements IGroupsController {
    groupsService: IGroupsService;

    constructor(
        @inject(TYPE.SERVICE.GROUPS) groupsService: IGroupsService,
    ) {
        this.groupsService = groupsService;
    }

    createGroup: IGroupsController['createGroup'] = async (req, res) => {
        this.groupsService.createGroup({
            ...req.body,
        }).then((user) => {
            res.send(user);
        }).catch((error) => {
            let message = 'Unexpected error.';

            if (error instanceof DataMappingError) {
                message = error.message;
            }

            res.status(400).send({
                message,
            });
        })
    }

    getGroup: IGroupsController['getGroup'] = async (req, res) => {
        const id = req.params.id || '';

        this.groupsService.getGroup(id)
            .then((group) => {
                res.send(group);
            }).catch((error) => {
                let message = 'Unexpected error.';

                if (error instanceof DataMappingError) {
                    message = error.message;
                }

                if (error instanceof UserDoesNotExist) {
                    message = `User with { id: "${id}" } doesn't exist.`;
                }

                res.status(400).send({
                    message,
                });
            });
    }

    getGroups: IGroupsController['getGroups'] = async (req, res) => {
        const {
            loginSubstring,
            limit,
        } = req.query;

        this.groupsService.getGroups()
            .then((groups) => {
                res.send(groups);
            }).catch((error) => {
                let message = 'Unexpected error.';
    
                if (error instanceof DataMappingError) {
                    message = error.message;
                }

                if (error instanceof DataMappingError) {
                    message = error.message;
                }
    
                res.status(400).send({
                    message,
                });
            });
    }

    updateGroup: IGroupsController['updateGroup'] = async (req, res) => {
        const id = req.params.id || '';
        const updateData = {
            id,
            ...req.body,
        }

        this.groupsService.updateGroup(updateData)
            .then((...value) => {
                res.send(value);
            }).catch((error) => {
                let message = 'Unexpected error.';

                if (error instanceof DataMappingError) {
                    message = error.message;
                }

                if (error instanceof UserDoesNotExist) {
                    message = `User with { id: "${id}" } doesn't exist.`;
                }

                res.status(400).send({
                    message,
                });
            })
    }

    deleteGroup: IGroupsController['deleteGroup'] = (req, res) => {
        const id = req.params.id || '';

        this.groupsService.deleteGroup(id)
            .then(() => {
                res.send();
            }).catch((error) => {
                let message = 'Unexpected error.';

                if (error instanceof UserDoesNotExist) {
                    message = `User with { id: "${id}" } doesn't exist.`;
                }

                res.status(400).send({
                    message,
                });
            })
    }

    addGroupUsers: IGroupsController['addGroupUsers'] = (req, res) => {
        const groupId = req.params.id || '';
        const usersIds = req.body.users || [];

        this.groupsService.addGroupUsers(groupId, usersIds).then(() => {
            res.send();
        }).catch((error) => {
            res.send(error);
        });
    }

    getGroupUsers: IGroupsController['getGroupUsers'] = (req, res) => {
        const groupId = req.params.id || '';

        this.groupsService.getGroupUsers(groupId).then((users) => {
            res.send(users);
        }).catch((error) => {
            res.send(error);
        });
    }
}
