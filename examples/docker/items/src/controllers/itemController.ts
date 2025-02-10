// // import { Response } from 'express';
// // // import axios, { AxiosError } from 'axios';
// // import axios from 'axios';

// // import { BadRequestError, CurrentUserRequest, EventTypes } from '@chronosrx/common';
// // import { Item } from '../models/items';

// // export const createItem = async (req: CurrentUserRequest, res: Response) => {
// //   const { itemName } = req.body;
// //   if (!itemName) {
// //     throw new BadRequestError('Invalid inputs');
// //   }

// //   const newItem = Item.build({
// //     itemName,
// //   });
// //   await newItem.save();

// //   // posting event to event bus
// //   try {
// //     await axios.post('http://event-bus:3005/', {
// //       event: {
// //         type: EventTypes.ITEM_CREATED,
// //         payload: newItem,
// //       },
// //     });
// //   } catch (err) {
// //     console.log(
// //       `❌ itemController.createItem: Failed to emit ITEM_CREATED to event-bus: ${
// //         (err as AxiosError).message || 'unknown error'
// //       }`
// //     );
// //   }
// //   res.status(201).send(newItem);
// // };
// import { Response } from 'express';
// import axios from 'axios';
// import { BadRequestError, CurrentUserRequest, EventTypes } from '@chronosrx/common';
// import { Item } from '../models/items';

// export const createItem = async (req: CurrentUserRequest, res: Response) => {
//   const { itemName } = req.body;
//   if (!itemName) {
//     throw new BadRequestError('Invalid inputs');
//   }

//   const newItem = Item.build({
//     itemName,
//   });
//   await newItem.save();

//   // posting event to event bus
//   try {
//     await axios.post('http://event-bus:3005/', {
//       event: {
//         type: EventTypes.ITEM_CREATED,
//         payload: newItem,
//       },
//     });
//   } catch (err) {
//     if (axios.isAxiosError(err)) {
//       console.log(
//         `❌ itemController.createItem: Failed to emit ITEM_CREATED to event-bus: ${err.message || 'unknown error'}`
//       );
//     } else {
//       console.log('❌ itemController.createItem: An unknown error occurred');
//     }
//   }
//   res.status(201).send(newItem);
// };
import { Response } from 'express';
import axios from 'axios';
import { BadRequestError, CurrentUserRequest, EventTypes } from '@chronosrx/common';
import { Item } from '../models/items';

// Custom type guard to determine if the error looks like an Axios error.
// Adjust the check if you need to verify more specific properties.
const isAxiosError = (error: unknown): error is { message: string } => {
  return (
    typeof error === 'object' &&
    error !== null &&
    'message' in error &&
    typeof (error as any).message === 'string'
  );
};

export const createItem = async (req: CurrentUserRequest, res: Response) => {
  const { itemName } = req.body;
  if (!itemName) {
    throw new BadRequestError('Invalid inputs');
  }

  const newItem = Item.build({ itemName });
  await newItem.save();

  // Posting event to event bus
  try {
    await axios.post('http://event-bus:3005/', {
      event: {
        type: EventTypes.ITEM_CREATED,
        payload: newItem,
      },
    });
  } catch (err: unknown) {
    if (isAxiosError(err)) {
      console.log(
        `❌ itemController.createItem: Failed to emit ITEM_CREATED to event-bus: ${err.message || 'unknown error'}`
      );
    } else if (err instanceof Error) {
      console.log(`❌ itemController.createItem: ${err.message}`);
    } else {
      console.log('❌ itemController.createItem: An unknown error occurred');
    }
  }

  res.status(201).send(newItem);
};
