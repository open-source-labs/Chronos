import express from 'express';
import { Inventory } from '../models/Inventory';
import { EventTypes, Events } from '@chronosrx/common';

const router = express.Router();

router.post('/', async (req, res) => {
  const event: Events = req.body.event;
  console.log('🎃 Inventory - Event Received: , ', event);

  switch (event.type) {
    // Duplicate item created
    case EventTypes.ITEM_CREATED:
      const newInventory = Inventory.build({
        id: event.payload.id,
        itemName: event.payload.itemName,
      });
      await newInventory.save();
      break;
  }
  return res.send({ message: 'Event received' });
});

export default router;
