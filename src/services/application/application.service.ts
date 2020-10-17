import "reflect-metadata";
import { injectable } from 'inversify';
import { IApplicationService } from './application.service.types';

@injectable()
export class ApplicationService implements IApplicationService {
    login: IApplicationService['login'] = (login: string, password: string) => {
        console.log('### login:', login);
        console.log('### password:', password);
    }
}