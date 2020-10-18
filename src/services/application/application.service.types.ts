export interface IApplicationService {
    login: (login: string, password: string) => Promise<string>;
    refresh: (accessToken: string) => Promise<string>;
}