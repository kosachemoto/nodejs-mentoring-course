import "reflect-metadata";
import jwt from 'jsonwebtoken';
import { injectable, inject } from 'inversify';
import { IAuthenticationService } from './authentication.service.types';
import { TYPE } from '@ioc/inversify.types';
import { NUsersService } from '@services/users';
import { AccessTokenDoesNotExist } from "@utils/custom-errors";
import { NAuthentication } from 'src/authentication';

@injectable()
export class AuthenticationService implements IAuthenticationService {
    usersService: NUsersService.IUsersService;
    options: NAuthentication.TOptions;

    constructor(
        @inject(TYPE.SERVICE.USERS) usersService: NUsersService.IUsersService,
        @inject(TYPE.AUTHENTICATION.OPTIONS) options: NAuthentication.TOptions,
    ) {
        this.usersService = usersService;
        this.options = options;
    }

    login: IAuthenticationService['login'] = async (login, password) => {
        return this.usersService.getUser.byCredentials(login, password).then(({ id }) => (
            id
        )).then((id) => {
            const accessToken = jwt.sign(
                { id },
                this.options.ACCESS_TOKEN_SECRET,
                { algorithm: "HS256", expiresIn: this.options.ACCESS_TOKEN_LIFE });

            const refreshToken = jwt.sign(
                { id },
                this.options.REFRESH_TOKEN_SECRET,
                { algorithm: "HS256", expiresIn: this.options.REFRESH_TOKEN_LIFE });

            return {
                id,
                accessToken,
                refreshToken,
            };
        }).then(({ id, accessToken, refreshToken }) => {
            this.usersService.updateRefreshToken({
                id,
                refreshToken,
            });

            return accessToken;
        });
    }

    refresh: IAuthenticationService['refresh'] = async (accessToken) => {
        if (!accessToken) {
            throw new AccessTokenDoesNotExist();
        }
        
        const id = await Promise.resolve().then(() => (
            jwt.verify(accessToken, this.options.ACCESS_TOKEN_SECRET) as { id: string }
        )).then(({ id }) => (
            id
        ));

        const refreshToken = await this.usersService.getRefreshToken(id);

        await Promise.resolve().then(() => {
            jwt.verify(refreshToken, this.options.REFRESH_TOKEN_SECRET);
        });

        const newAccessToken = jwt.sign(
            {
                id
            },
            this.options.ACCESS_TOKEN_SECRET,
            {
                algorithm: "HS256",
                expiresIn: this.options.ACCESS_TOKEN_LIFE,
            }
        );

        return newAccessToken;
    }
}