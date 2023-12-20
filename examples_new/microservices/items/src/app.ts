import express from 'express';
import 'express-async-errors';
import dotenv from 'dotenv';
dotenv.config();
import { NotFoundError, errorHandler } from '@chronosrx/common';
import itemsRouter from './routes/item-router';
import eventRouter from './routes/event-router';
import cookieParser from 'cookie-parser';

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use('/api/items', itemsRouter);
app.use('/events', eventRouter);

app.use('*', (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
