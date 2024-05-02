import express from 'express';
import 'express-async-errors';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import orderRouter from './routes/order-router';
import eventRouter from './routes/event-router';
import { NotFoundError, errorHandler } from '@chronosrx/common';

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
    origin: 'http://localhost:5001',
  })
);

app.use(express.json());
app.use(cookieParser());

app.use('/api/orders', orderRouter);
app.use('/events', eventRouter);

app.use('*', (_req, _res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
