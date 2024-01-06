import { Request, Response } from 'express';
import axios from 'axios';
import { Order } from '../models/Order';
import { BadRequestError, CurrentUserRequest, EventTypes, Events } from '@chronosrx/common';

export const createOrder = async (req: CurrentUserRequest, res: Response) => {
  //deconstruct req.body
  // const buyerId = req.currentUser;
  const { itemId, amount } = req.body;
  //create Order document in the databse
  const newOrder = Order.build({
    itemId,
    amount,
  });
  await newOrder.save();
  //send created order to event bus
  await axios.post('http://localhost:3005/', {
    event: {
      type: EventTypes.ORDER_CREATED,
      payload: newOrder,
    },
  });
  res.status(201).send(newOrder);
};

// export const getOrder = async (req: Request, res: Response) => {
//   // check if order already exists
//   const { buyerId } = req.body;
//   const exsitingOrder = await Order.findOne({ buyerId });
//   if (!exsitingOrder) {
//     throw new BadRequestError('Order with that id does not exists');
//   }
//   //check inventory itemId, amount
//   res.status(200).send(exsitingOrder);
// };

// export const deleteOrder = async (req: Request, res: Response) => {
//   const { id } = req.body;
//   const deletedOrder = await Order.findOneAndDelete({ id });
//   if (!deletedOrder) {
//     throw new BadRequestError(`Could not find that order by id to delete`);
//   }
//   res.status(200).send(deletedOrder);
// };
