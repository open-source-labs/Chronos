import { Response } from 'express';
import axios, { AxiosError } from 'axios';
import { BadRequestError, CurrentUserRequest, EventTypes } from '@chronosrx/common';
import { Item } from '../models/items';

export const createItem = async (req: CurrentUserRequest, res: Response) => {
  const { itemName } = req.body;
  if (!itemName) {
    throw new BadRequestError('Invalid inputs');
  }

  const newItem = Item.build({
    itemName,
  });
  await newItem.save();

  // posting event to event bus
  try {
    await axios.post('http://localhost:3005/', {
      event: {
        type: EventTypes.ITEM_CREATED,
        payload: newItem,
      },
    });
  } catch (err) {
    console.log(
      `❌ itemController.createItem: Failed to emit ITEM_CREATED to event-bus: ${
        (err as AxiosError).message || 'unknown error'
      }`
    );
  }
  res.status(201).send(newItem);
};
