import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import { NotFoundError, errorHandler } from '@chronosrx/common';
import inventoryRouter from './routes/inventory-router';
import cookieParser from 'cookie-parser';
import eventRouter from './routes/event-router';

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use('/api/inventory', inventoryRouter);
app.use('/events', eventRouter);

app.use('*', (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
