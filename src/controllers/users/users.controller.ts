import { Request, Response } from 'express';
import {
    UsersService,
    UsersServiceTypes
} from '../../services/users';
import { UsersControllerTypes } from './users.controller.types';

export class UsersController implements UsersControllerTypes.Controller {
    usersService: UsersServiceTypes.Service;
    
    constructor() {
        this.usersService = new UsersService();
    };

    createUser = (req: Request<{}, {}, UsersServiceTypes.SaveData>, res: Response) => {
        this.usersService.createUser({
            ...req.body,
        });
    
        res.send(req.statusCode);
    };
    
    getUser = (req: Request<UsersControllerTypes.GetUserProps>, res: Response) => {
        const user = this.usersService.getUser(req.params.id); 
        
        res.send(user);
    };
    
    getUsers = (req: Request<{}, {}, {}, UsersControllerTypes.GetUsersQuery>, res: Response) => {
        const {
            loginSubstring,
            limit,
        } = req.query;
        if (loginSubstring) {

        }

        const users = loginSubstring ? this.usersService.getAutoSuggestUsers(loginSubstring, limit) : this.usersService.getUsers();

        res.send(users);
    };
    
    updateUser = (req: Request<UsersControllerTypes.UpdateUserProps, {}, UsersControllerTypes.UpdateUserBody>, res: Response) => {
        const id = req.params.id;
    
        this.usersService.updateUser({
            id,
            ...req.body,
        });

        const updatedUser = this.usersService.getUser(id);
        
        res.send(updatedUser);
    };
    
    deleteUser = (req: Request<UsersControllerTypes.DeleteUserProps>, res: Response) => {
        const id = req.params.id;
    
        this.usersService.deleteUser(id);

        res.status(200).end();
    };
};
