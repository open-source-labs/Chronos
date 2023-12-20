import { Request, Response } from 'express';
import axios from 'axios';
import { Inventory } from '../models/Inventory';
import { BadRequestError, CurrentUserRequest, Events } from '@chronosrx/common';

export const getItemInventory = async (req: Request, res: Response) => {
  console.log(req.body);
  const { itemId, units } = req.body;
  const exsitingItem = await Inventory.findOne({ itemId });
  if (!exsitingItem) {
    throw new BadRequestError('Item with that ID does not exist');
  }

  // await axios.post('http://localhost:3005/', {
  //   event: {
  //     type: Events.ITEM_CREATED,
  //     payload: newInventory,
  //   },
  // });

  res.status(200).send(exsitingItem);
};

export const updateItemInventory = async (req: Request, res: Response) => {
  const { itemId, units } = req.body;
  const exsitingItem = await Inventory.findOne({ itemId });
  if (!exsitingItem) {
    throw new BadRequestError('Item with that ID does not exist and could not update');
  }
  exsitingItem.units = units;
  await exsitingItem.save();
  res.status(200).send(exsitingItem);
};
