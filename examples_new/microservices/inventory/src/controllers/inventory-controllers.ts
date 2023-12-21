import { Request, Response } from 'express';
import axios from 'axios';
import { Inventory } from '../models/Inventory';
import { BadRequestError, CurrentUserRequest, EventTypes, Events } from '@chronosrx/common';

export const getAllItems = async (req: Request, res: Response) => {
  console.log(req.body);

  const exsitingItem = await Inventory.find({});
  res.status(200).send(exsitingItem);
};
//   // await axios.post('http://localhost:3005/', {
//   //   event: {
//   //     type: Events.ITEM_CREATED,
//   //     payload: newInventory,
//   //   },
//   // });
//   res.status(200).send(exsitingItem);
// };

// export const getMyItems = async (req: Request, res: Response) => {
//   console.log(req.body);
//   const { sellerId } = req.body;
//   const exsitingItem = await Inventory.find({ sellerId });
//   if (!exsitingItem) {
//     throw new BadRequestError('Could not find items with that sellerId');
//   }
//   res.status(200).send(exsitingItem);
// };

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
    await axios.post('http://localhost:3005/', {
      event: {
        type: EventTypes.INVENTORY_UPDATED,
        payload: newInventory,
      },
    });
  } catch (err) {
    console.log(`failed to submit to eventbus`);
  }

  res.status(200).send(newInventory);
};
