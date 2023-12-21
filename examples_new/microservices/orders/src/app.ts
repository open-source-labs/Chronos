import path from 'path';
import express from 'express';
import 'express-async-errors';
import dotenv from 'dotenv';
dotenv.config({ path: path.resolve(__dirname + '../../.env') });
import cors from 'cors';
import { NotFoundError, errorHandler } from '@chronosrx/common';
import cookieParser from 'cookie-parser';
import orderRouter from './routes/order-router';
import eventRouter from './routes/event-router';

const app = express();

app.use(
  cors({
    credentials: true,
    origin: 'http://localhost:5000',
  })
);

app.use(express.json());
app.use(cookieParser());

// app.get('/', (req, res) => {
//   console.log('💥 Test Route');
//   res.status(200).send({ msg: '💥 Test route' });
// });

app.use('/api/orders', orderRouter);
app.use('/events', eventRouter);

app.use('*', (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
