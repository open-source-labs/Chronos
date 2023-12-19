import { Request, Response } from 'express';
import axios from 'axios';
import { BadRequestError, CurrentUserRequest, Events } from '@chronosrx/common';
import { Item } from '../models/items';
// import { attachCookie } from '../util/attachCookie';

export const createItem = async (req: CurrentUserRequest, res: Response) => {
  const { itemName, unitPrice } = req.body;
  const sellerId = req.currentUser!;
  //
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

  await axios.post('http:/localhost:3005/', {
    event: {
      type: Events.ITEM_CREATED,
      payload: newItem,
    },
  });
  res.status(201).send(newItem);
};
