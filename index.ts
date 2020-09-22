import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import { usersRouter, groupsRoute } from '@routes/.';

dotenv.config();

const app = express();
const port = process.env.PORT;

app.set('case sensitive routing', true);

app.use(bodyParser.json());
app.use('/users', usersRouter);
app.use('/groups', groupsRoute);

app.listen(port, () => {
    console.log('haha we are listening', port);
});
