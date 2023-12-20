import express from 'express';
import { Events } from '@chronosrx/common';
import { Order } from '../models/Order';

const router = express.Router();

router.post('/', async (req, res) => {
  const { event } = req.body;
  console.log(event);
  switch (event.type) {
    case Events.ITEM_CREATED:
      const newOrder = Order.build(event.payload);
      await newOrder.save();
      break;
    default:
      res.send({});
  }

  res.send({ message: '🎃 Event received' });
});

export default router;
