import express from 'express';
import dotenv from 'dotenv';
import { Command } from 'commander';
import bodyParser from 'body-parser';
import { usersRouter, groupsRoute } from '@routes/.';
import { container } from '@ioc/inversify.config';
import { TYPE } from '@ioc/inversify.types';
import { NMorganTypes } from 'src/logger/morgan';

dotenv.config();

const commander = new Command();

commander
    .option('--development', 'flag to run application development mode')
    .option('--production', 'flag to run application production mode')
    .parse(process.argv)
    
commander.parse(process.argv);

const app = express();
const port = process.env.PORT;

const mode = container.get<string>(TYPE.APPLICATION.MODE);
app.set('case sensitive routing', true);

app.use(bodyParser.json());
app.use('/users', usersRouter);
app.use('/groups', groupsRoute);

app.listen(port, () => {
    console.log('haha we are listening', port);
});
