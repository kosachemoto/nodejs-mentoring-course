import path from 'path';

export const DEVELOPMENT = 'development';
export const PRODUCTION = 'production';

export const MAIN_FILENAME = require.main?.filename;

if (!MAIN_FILENAME) {
    throw new Error('Something wrong with root path.');
}

export const ROOT_PATH = path.dirname(MAIN_FILENAME);
