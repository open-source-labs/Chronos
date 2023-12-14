import express from 'express';
import 'express-async-errors';
import dotenv from 'dotenv';
dotenv.config();
import { NotFoundError, errorHandler } from '@chronosrx/common';
import authRouter from './routes/auth-router';
import cookieParser from 'cookie-parser';

const app = express();

app.use(express.json());
app.use(cookieParser())

// app.get('/', (req, res) => {
//   console.log('💥 Test Route');
//   res.status(200).send({ msg: '💥 Test route' });
// });

app.use('/api/auth', authRouter);

app.use('*', (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
