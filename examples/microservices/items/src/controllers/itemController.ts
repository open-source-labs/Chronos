// // import { Request, Response, NextFunction } from 'express';
// import axios from 'axios';

// import { BadRequestError, CurrentUserRequest, EventTypes } from '@chronosrx/common';
// import { Item } from '../models/items';

// export const createItem = async (
//   req: CurrentUserRequest,
//   res: Response,
//   next: NextFunction
// ): Promise<void> => {
//   try {
//     const { itemName } = req.body;
//     if (!itemName) {
//       // Instead of throwing directly, pass the error to next()
//       return next(new BadRequestError('Invalid inputs'));
//     }

//     const newItem = Item.build({ itemName });
//     await newItem.save();

//     // Posting event to event bus
//     try {
//       await axios.post('http://localhost:3005/', {
//         event: {
//           type: EventTypes.ITEM_CREATED,
//           payload: newItem,
//         },
//       });
//     } catch (err: unknown) {
//       let errorMessage = 'unknown error';
//       if (err instanceof Error) {
//         errorMessage = err.message;
//       }
//       console.log(
//         `❌ itemController.createItem: Failed to emit ITEM_CREATED to event-bus: ${errorMessage}`
//       );
//       // Optionally, you can call next(err) here if you want to forward the error.
//     }
    
//     res.status(201).send(newItem);
//   } catch (err) {
//     next(err);
//   }
// };
import { Request, Response, NextFunction, RequestHandler } from 'express';
import axios from 'axios';

import { BadRequestError, CurrentUserRequest, EventTypes } from '@chronosrx/common';
import { Item } from '../models/items';

// Explicitly type the handler as RequestHandler. This helps Express (and TypeScript)
// understand that createItem is a middleware function (with the signature (req, res, next)).

export const createItem: RequestHandler = async (
  req: CurrentUserRequest, 
  res: Response, 
  next: NextFunction
) => {
  try {
    const { itemName } = req.body;
    if (!itemName) {
      return next(new BadRequestError('Invalid inputs'));
    }

    const newItem = Item.build({ itemName });
    await newItem.save();

    // Posting event to event bus
    try {
      await axios.post('http://localhost:3005/', {
        event: {
          type: EventTypes.ITEM_CREATED,
          payload: newItem,
        },
      });
    } catch (err: unknown) {
      let errorMessage = 'unknown error';
      if (err instanceof Error) {
        errorMessage = err.message;
      }
      console.log(
        `❌ itemController.createItem: Failed to emit ITEM_CREATED to event-bus: ${errorMessage}`
      );
      // Optionally, you can forward the error with next(err)
    }
    
    res.status(201).send(newItem);
  } catch (err) {
    next(err);
  }
};
