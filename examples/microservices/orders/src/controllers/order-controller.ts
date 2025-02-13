import { Request, Response } from 'express';
import axios from 'axios';
import { Order } from '../models/Order';
import { CurrentUserRequest, EventTypes } from '@chronosrx/common';

export const getAllOrders = async (req: Request, res: Response) => {
  const orders = await Order.find({});
  res.status(200).send(orders);
};

export const createOrder = async (req: CurrentUserRequest, res: Response) => {
  const { item, amount,totalPrice,sellerId } = req.body;
  const newOrder = Order.build({
    item,
    amount,totalPrice,sellerId
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

// export const deleteOrder = async (req: Request, res: Response) => {
//   const { id } = req.body;
//   const deletedOrder = await Order.findOneAndDelete({ id });
//   if (!deletedOrder) {
//     throw new BadRequestError(`Could not find that order by id to delete`);
//   }
//   res.status(200).send(deletedOrder);
// };
