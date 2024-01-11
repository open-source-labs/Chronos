import { Request, Response } from 'express';
import axios from 'axios';
import { Inventory } from '../models/Inventory';
import { BadRequestError, CurrentUserRequest, EventTypes, Events } from '@chronosrx/common';

export const getAllItems = async (req: Request, res: Response) => {
  const exsitingItems = await Inventory.find({});

  res.status(200).send(exsitingItems);
};

export const updateItemInventory = async (req: Request, res: Response) => {
  const { id, units } = req.body;
  console.log(req.body);
  const newInventory = await Inventory.findById(id);
  console.log(newInventory);
  if (!newInventory) {
    throw new BadRequestError('Item with that ID does not exist and could not update');
  }
  newInventory.units = units;
  await newInventory.save();
  try {
    await axios.post('http://event-bus:3005/', {
      event: {
        type: EventTypes.INVENTORY_UPDATED,
        payload: newInventory,
      },
    });
  } catch (err) {
    console.log(`failed to submit to eventbus`);
  }

  const allInventory = await Inventory.find({});

  res.status(200).send(allInventory);
};
