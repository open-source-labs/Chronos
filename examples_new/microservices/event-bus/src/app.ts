import express, { Request, Response } from 'express';
import axios from 'axios';
import { NotFoundError, errorHandler } from '@chronosrx/common';

const app = express();

app.use(express.json());

app.use('/', (req: Request, res: Response) => {
  // console.log(req.body);
  const { event } = req.body;
  // console.log('Event Received');

  console.log('Event Bus Publishing event:', event);
  // Auth
  axios.post('http://localhost:3000/events', { event });
  // Item
  // axios.post('http://localhost:3001/events', {event});
  // Inventory
  // axios.post('http://localhost:3002/events', {event});
  // Order
  // axios.post('http://localhost:3003/events', {event});

  res.send({});
});

app.use('*', (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
