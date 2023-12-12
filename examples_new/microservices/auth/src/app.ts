import express from 'express';
import { NotFoundError, errorHandler } from '@chronosrx/common';
import authRouter from './routes/auth-router';

const app = express();

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
