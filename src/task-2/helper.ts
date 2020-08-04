import * as path from 'path';

export const ROOT_PATH = path.dirname(require.main.filename);
export const MODULE_PATH = path.dirname(__filename);
export const CSV_FILE_PATH =  ROOT_PATH + '/csv/nodejs-hw1-ex1.csv';
export const OUTPUT_FILE_PATH = MODULE_PATH + '/output.txt';

export const keysToLowerCase = (line: string, index: number) => {
    if (!index) {
        return line.toLowerCase();
    }

    return line;
};