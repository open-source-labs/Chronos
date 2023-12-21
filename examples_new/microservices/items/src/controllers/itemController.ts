import { Request, Response } from 'express';
import axios, { AxiosError } from 'axios';
import { BadRequestError, CurrentUserRequest, EventTypes, NotAuthorizedError } from '@chronosrx/common';
import { Item } from '../models/items';
import { User } from '../models/users';
import { RemoveUserOptions } from 'mongodb';

// current users can create items to sell
export const createItem = async (req: CurrentUserRequest, res: Response) => {
  
  // req.body consists of itemName and unitPrice
  const { itemName, unitPrice } = req.body;
  // sellerId will come from cookie assigned to authorized users
  const sellerId = req.currentUser!;
  // seller must have a cookie assigned in order to sell items
  if (!sellerId) {
    throw new BadRequestError('Only registered users can list items for sale');
  }
  const seller = User.findById(sellerId);
  if (!seller) {
    throw new BadRequestError('Only registered users can list items for sale');
  }
  // both itemName and unitPrice are required inputs and unitPrice must be a number
  if (!itemName || !unitPrice) {
    throw new BadRequestError('Invalid inputs');
  }
  if (typeof unitPrice !== 'number') {
    throw new BadRequestError('Unit price must be a number');
  }
  // new item is created with the build method and then saved
  const newItem = Item.build({
    itemName,
    sellerId,
    unitPrice,
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

// sellers can delete their item
export const deleteItem = async (req: CurrentUserRequest, res: Response) => {
  const { itemName } = req.body;
  const sellerId = req.currentUser!;
  // if sellerId doesn't exist, throw error as only authorized users can delete items
  if (!sellerId) {
    throw new NotAuthorizedError();
  }
  // if only item "owner" can delete item so sellerId must match
  const seller = User.findById(sellerId);
  if (!seller) {
    throw new NotAuthorizedError();
  }
  // search for itemName given by user
  const findItem = await Item.findOne({ itemName });
  console.log(findItem);
  if (!findItem) {
    throw new BadRequestError('Item does not exist');
  }
  // delete Item
  else {
    Item.deleteOne({ itemName });
  }
  // posting event to event bus
  try {
    await axios.post('http://localhost:3005/', {
      event: {
        type: EventTypes.ITEM_DELETED,
        payload: findItem,
      },
    });
  } catch (err) {
    console.log(
      `❌ itemController.deleteItem: Failed to emit ITEM_DELETED to event-bus: ${
        (err as AxiosError).message || 'unknown error'
      }`
    );
  }
  console.log(`${itemName} has been deleted`);
  res.status(201);
};
