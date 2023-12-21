import { EventTypes, Events } from '@chronosrx/common';
import express from 'express';
import { Inventory } from '../models/Inventory';
import { User } from '../models/user';

const router = express.Router();

router.post('/', async (req, res) => {
  const event: Events = req.body.event;
  console.log(event);
  switch (event.type) {
    case EventTypes.USER_CREATED:
      // console.log(event);
      const newUser = User.build(event.payload);
      await newUser.save();
      break;
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

// router.get('/events');

export default router;
