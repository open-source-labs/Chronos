import express, { Request, Response } from 'express';
import axios from 'axios';
import { NotFoundError, errorHandler } from '@chronosrx/common';

import chronosConfig from './chronos-config';
const Chronos = require('@chronosmicro/tracker');
const chronos = new Chronos(chronosConfig);

chronos.propagate();

const app = express();

// const trackingMiddleware = chronos.track();
// app.use(trackingMiddleware);

app.use(express.json());

app.use('/', async (req: Request, res: Response) => {
  // console.log(req.body);
  const { event } = req.body;
  // console.log('Event Received');

  console.log('Event Bus Publishing event:', event);
  // Auth
  try {
    await axios.post('http://localhost:3000/events', { event });
  } catch (err) {
    console.log(`Failed to emit event ${event.type} to the Auth Service`);
  }
  // Item
  try {
    await axios.post('http://localhost:3001/events', { event });
  } catch (err) {
    console.log(`Failed to emit event ${event.type} to the Items Service`);
  }
  // Inventory
  try {
    await axios.post('http://localhost:3002/events', { event });
  } catch (err) {
    console.log(`Failed to emit event ${event.type} to the Inventory Service`);
  }
  // Order
  try {
    await axios.post('http://localhost:3003/events', { event });
  } catch (err) {
    console.log(`Failed to emit event ${event.type} to the Orders Service`);
  }

  res.send({});
});

app.use('*', (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
