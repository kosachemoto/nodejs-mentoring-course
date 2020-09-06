const path = require('path');

const ROOT_PATH = path.dirname(require?.main?.filename ?? '.');
const MODULE_PATH = path.dirname(__filename);
const CSV_FILE_PATH =  ROOT_PATH + '/csv/nodejs-hw1-ex1.csv';
const OUTPUT_FILE_PATH = MODULE_PATH + '/output.txt';

const keysToLowerCase = (line: string, index: number) => {
    if (!index) {
        return line.toLowerCase();
    }

    return line;
};

export = {
    ROOT_PATH,
    MODULE_PATH,
    CSV_FILE_PATH,
    OUTPUT_FILE_PATH,
    keysToLowerCase,
};