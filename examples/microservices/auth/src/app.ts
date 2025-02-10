import express from 'express';
import 'express-async-errors';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRouter from './routes/auth-router.js';
import eventRouter from './routes/event-router.js';
import { NotFoundError, errorHandler } from '@chronosrx/common';

import chronosConfig from './chronos-config.js';
// const Chronos = require('../../../../chronos_npm_package/chronos');
import Chronos from '../../../../chronos_npm_package/chronos.js';

// const chronos = new Chronos(chronosConfig);
// const chronos = new Chronos({
//   ...chronosConfig,
//   mode: chronosConfig.mode as 'kafka' | 'kubernetes' | 'microservices' | 'docker', // ✅ Type assertion
// });
const chronos = new Chronos({
  ...chronosConfig,
  mode: chronosConfig.mode as 'kafka' | 'kubernetes' | 'microservices' | 'docker',
  database: {
    ...chronosConfig.database,
    URI: chronosConfig.database.URI || '', // ✅ Ensure `URI` is always a string
  },
});

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

app.use('/api/auth', authRouter);
app.use('/events', eventRouter);

app.use('*', (_req, _res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
