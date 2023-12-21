import { Request, Response } from 'express';
import axios from 'axios';
import { Order } from '../models/Order';
import { BadRequestError, CurrentUserRequest, Events } from '@chronosrx/common';
import { Inventory } from '../models/Inventory';

export const createOrder = async (req: CurrentUserRequest, res: Response) => {
  //deconstruct req.body
  const buyerId = req.currentUser;
  const { itemId, amount, totalPrice, sellerId } = req.body;
  //create Order document in the databse
  const newOrder = Inventory.build({});
  await newOrder.save();
  //send created order to event bus
  await axios.post('http://localhost:3005/', {
    event: {
      type: Events.ORDER_CREATED,
      payload: newOrder,
    },
  });
  res.status(201).send(newOrder);
};

export const getOrder = async (req: Request, res: Response) => {
  // check if order already exists
  const { buyerId } = req.body;
  const exsitingOrder = await Order.findOne({ buyerId });
  if (!exsitingOrder) {
    throw new BadRequestError('Order with that id does not exists');
  }
  //check inventory itemId, amount
  res.status(200).send(exsitingOrder);
};

export const getSale = async (req: Request, res: Response) => {
  const { sellerId } = req.body;
  const sales = await Order.find({ sellerId });
  if (!sales) {
    throw new BadRequestError('Sales with that sellerId does not exist');
  }
  res.status(200).send(sales);
};

export const deleteOrder = async (req: Request, res: Response) => {
  const { id } = req.body;
  const deletedOrder = await Order.findOneAndDelete({ id });
  if (!deletedOrder) {
    throw new BadRequestError(`Could not find that order by id to delete`);
  }
  res.status(200).send(deletedOrder);
};
