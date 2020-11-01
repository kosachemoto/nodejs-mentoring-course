import { Command } from 'commander';
import { DEVELOPMENT, PRODUCTION } from '@utils/variables';

const commander = new Command();

commander
    .option('--development', 'flag to run application development mode')
    .option('--production', 'flag to run application production mode')
    .parse(process.argv);

const {
    development: isDevelopment,
    production: isProduction,
} = commander;

if (!(isDevelopment === undefined || isProduction === undefined)) {
    throw new Error('Application mode required.');
};

export const applicationMode = isProduction ? PRODUCTION : DEVELOPMENT;