export interface IAuthenticationService {
    login: (login: string, password: string) => Promise<string>;
}