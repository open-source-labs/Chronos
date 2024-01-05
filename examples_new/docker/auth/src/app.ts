import path from 'path';
import express from 'express';
import 'express-async-errors';
// import dotenv from 'dotenv';
// dotenv.config({ path: path.resolve(__dirname + '../../.env') });
import { NotFoundError, errorHandler } from '@chronosrx/common';
import authRouter from './routes/auth-router';
import eventRouter from './routes/event-router';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import chronosConfig from './chronos-config';
const Chronos = require('@chronosmicro/tracker');
const chronos = new Chronos(chronosConfig);
chronos.propagate();

const app = express();

const trackingMiddleware = chronos.track();
app.use(trackingMiddleware);

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

app.use('/api/auth', authRouter);
app.use('/events', eventRouter);

app.use('*', (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
