import express from 'express';
import EventTypes from '@chronosrx/common';
import { Order } from '../models/Order';
import { Inventory } from '../models/Inventory';

const router = express.Router();

router.post('/', async (req, res) => {
  const { EventTypes: Events } = req.body.event;

  switch (EventTypes) {
    case Events.ITEM_CREATED:
      const newOrder = Inventory.build(EventTypes.payload);
      await newOrder.save();
      break;
    default:
      res.send({});
  }

  res.send({ message: '🎃 Event received' });
});

export default router;
