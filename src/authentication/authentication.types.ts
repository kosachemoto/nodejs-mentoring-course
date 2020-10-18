export type TOptions = {
    ACCESS_TOKEN_SECRET: string;
    ACCESS_TOKEN_LIFE: number;
    REFRESH_TOKEN_SECRET: string;
    REFRESH_TOKEN_LIFE: number;
}

export type TOptionsKeys = keyof TOptions;