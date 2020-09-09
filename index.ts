import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import { userRouter } from './src/routes/users';

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(bodyParser.json());

app.use('/users', userRouter);

app.listen(port, () => {
    console.log('haha we are listening', port);
})