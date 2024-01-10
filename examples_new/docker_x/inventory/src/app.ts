import express from 'express';
import 'express-async-errors';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import inventoryRouter from './routes/inventory-router';
import eventRouter from './routes/event-router';
import { NotFoundError, errorHandler } from '@chronosrx/common';

import chronosConfig from './chronos-config';
const Chronos = require('@chronosmicro/tracker');
const chronos = new Chronos(chronosConfig);
chronos.propagate();

const app = express();

chronos.docker();

app.use(
  cors({
    credentials: true,
    origin: 'http://localhost:5000',
  })
);
app.use(express.json());
app.use(cookieParser());

app.use('/api/inventory', inventoryRouter);
app.use('/events', eventRouter);

app.use('*', (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
