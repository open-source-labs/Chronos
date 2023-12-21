import express from 'express';
import 'express-async-errors';
import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import { NotFoundError, errorHandler } from '@chronosrx/common';
import inventoryRouter from './routes/inventory-router';
import cookieParser from 'cookie-parser';
import eventRouter from './routes/event-router';

const app = express();
app.use(
  cors({
    credentials: true,
    origin: 'http://localhost:8080',
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
