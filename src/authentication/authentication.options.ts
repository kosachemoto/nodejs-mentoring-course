import { UndefinedEnvValue } from '@utils/custom-errors';
import dotenv from 'dotenv';
import { TOptions, TOptionsKeys } from './authentication.types';

dotenv.config();

const {
    ACCESS_TOKEN_SECRET,
    ACCESS_TOKEN_LIFE,
    REFRESH_TOKEN_SECRET,
    REFRESH_TOKEN_LIFE,
} = process.env;

export const rawOptions = {
    ACCESS_TOKEN_SECRET,
    ACCESS_TOKEN_LIFE: ACCESS_TOKEN_LIFE ? +ACCESS_TOKEN_LIFE : undefined,
    REFRESH_TOKEN_SECRET,
    REFRESH_TOKEN_LIFE: REFRESH_TOKEN_LIFE ? +REFRESH_TOKEN_LIFE : undefined,
};

export const options = (Object.keys(rawOptions) as TOptionsKeys[]).reduce((options, key) => {
    if (!rawOptions[key]) {
        throw new UndefinedEnvValue(key);
    }

    return {
        ...options,
        [key]: rawOptions[key],
    }
}, {}) as TOptions;