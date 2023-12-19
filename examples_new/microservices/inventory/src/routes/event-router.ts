import { Events } from '@chronosrx/common';
import express from 'express';
import { Inventory } from '../models/Inventory';

const router = express.Router();

router.post('/', async (req, res) => {
  const { event } = req.body;
  // console.log('Event received:', event);
  switch (event.type) {
    case Events.ITEM_CREATED:
      console.log(event);
      const newInventory = Inventory.build(event.payload);
      await newInventory.save();
      break;
    default:
      res.send({});
  }
  res.send({ message: 'Event received' });
});

// router.get('/events');

export default router;
