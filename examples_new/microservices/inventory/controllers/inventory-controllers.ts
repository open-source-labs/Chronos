import { Request, Response } from 'express';
import axios from 'axios';
import { Inventory } from '../models/Inventory';
import { BadRequestError, CurrentUserRequest, Events } from '@chronosrx/common';

export const getItemInventory = async (req: Request, res: Response) => {
  const { itemId, units } = req.body;
  if (!itemId) {
    throw new BadRequestError(`Invalid Item ID`);
  }
  const newInventory = Inventory.build({
    itemId: itemId,
    units: 0,
  });
  await newInventory.save();

  await axios.post('http://localhost:3005/', {
    event: {
      type: Events.ITEM_CREATED,
      payload: newInventory,
    },
  });

  res.status(201).send(newInventory);
};

export const updateItemInventory = async (req: Request, res: Response) => {
  const { itemId, units } = req.body;
  if (!itemId) {
    throw new BadRequestError(`Item does not exist`);
  }
  const item = await Inventory.findById(itemId);
  res.status;
};

export const getCurrentUser = async (req: CurrentUserRequest, res: Response) => {
  // check request object for currentUser property
  if (!req.currentUser) {
    // if it doesn't exist send back status 200 with object with currentUser property set to null
    res.status(200).send({ currentUser: null });
  }

  // if it does exist - use req.currentUser to find user in database by id
  const user = await User.findById(req.currentUser);
  // send back 200 with object with property currentUser set to the user from the database
  res.status(200).send({ currentUser: user });
};
