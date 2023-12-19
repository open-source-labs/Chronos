import { Request, Response } from 'express';
import axios from 'axios';
import { BadRequestError, CurrentUserRequest, Events } from '@chronosrx/common';
import { Item } from '../models/items';
import { User } from '../models/users';
// import { attachCookie } from '../util/attachCookie';

export const createItem = async (req: CurrentUserRequest, res: Response) => {
  const { itemName, unitPrice } = req.body;
  const sellerId = req.currentUser!;
  console.log('💥 Seller Id:', sellerId);

  if (!sellerId) {
    throw new BadRequestError('Only registered users can list items for sale');
  }
  const seller = User.findById(sellerId);
  if (!seller) {
    throw new BadRequestError('Only registered users can list items for sale');
  }

  if (!itemName || !unitPrice) {
    throw new BadRequestError('Invalid inputs');
  }

  if (typeof unitPrice !== 'number') {
    throw new BadRequestError('Unit price must be a number');
  }

  const newItem = Item.build({
    itemName,
    sellerId,
    unitPrice,
  });
  await newItem.save();

  try {
    await axios.post('http:/localhost:3005/', {
      event: {
        type: Events.ITEM_CREATED,
        payload: newItem,
      },
    });
  } catch (error) {
    console.log('Failed to emit ITEM_CREATED to event-bus');
  }
  res.status(201).send(newItem);
};
