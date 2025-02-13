// // // import { Request, Response } from 'express';
// // import axios, { AxiosError, isAxiosError } from 'axios';
// // import { BadRequestError, CurrentUserRequest, EventTypes, Events } from '@chronosrx/common';
// // import { User } from '../models/user';
// // import { attachCookie } from '../util/attachCookie';

// // export const signup = async (req: Request, res: Response) => {
// //   const { username, password } = req.body;

// //   // Validate inputs
// //   if (!username || !password || password.length < 4) {
// //     throw new BadRequestError('Invalid inputs');
// //   }

// //   // Check if a user with the supplied username already exists
// //   const existingUser = await User.findOne({ username });
// //   if (existingUser) {
// //     throw new BadRequestError('User with that username exists');
// //   }

// //   // Create and save the user document
// //   const newUser = User.build({ username, password });
// //   await newUser.save();

// //   // Create an event for the new user
// //   const event: Events = {
// //     type: EventTypes.USER_CREATED,
// //     payload: {
// //       id: newUser.id,
// //       username: newUser.username,
// //     },
// //   };

// //   // Post the event to the event bus
// //   try {
// //     await axios.post('http://localhost:3005/', { event });
// //   } catch (err: unknown) {
// //     if (isAxiosError(err)) {
// //       // err is an AxiosError here
// //       console.log(
// //         `Failed to emit event USER_CREATED from auth: ${err.message || 'unknown error'}`
// //       );
// //     } else if (err instanceof Error) {
// //       console.log(`Failed to emit event USER_CREATED from auth: ${err.message}`);
// //     } else {
// //       console.log('Failed to emit event USER_CREATED from auth: unknown error');
// //     }
// //   }

// //   // Create a JWT and attach it to the response cookie
// //   const token = newUser.createJwt();
// //   attachCookie(res, token);

// //   res.status(201).send(newUser);
// // };

// // export const login = async (req: Request, res: Response) => {
// //   const { username, password } = req.body;
// //   if (!username || !password) {
// //     throw new BadRequestError('Must provide username and password');
// //   }
// //   const existingUser = await User.findOne({ username });
// //   if (!existingUser) {
// //     throw new BadRequestError('Invalid credentials');
// //   }
// //   const passwordsMatch = await existingUser.comparePassword(password);
// //   if (!passwordsMatch) {
// //     throw new BadRequestError('Invalid credentials');
// //   }
// //   const token = existingUser.createJwt();
// //   attachCookie(res, token);
// //   res.status(200).send(existingUser);
// // };

// // export const logout = async (req: Request, res: Response) => {
// //   res.cookie('token', null, {
// //     httpOnly: true,
// //     secure: false,
// //     expires: new Date(Date.now() + 500),
// //   });
// //   res.status(200).send({ message: 'success' });
// // };

// // export const getCurrentUser = async (req: CurrentUserRequest, res: Response) => {
// //   if (!req.currentUser) {
// //     return res.status(200).send({ currentUser: null });
// //   }
// //   const user = await User.findById(req.currentUser);
// //   res.status(200).send({ currentUser: user });
// // };
// // auth-controller.ts

// // Import Express types from the express package
// import { Request, Response } from 'express';

// // Import axios as default, then extract AxiosError and isAxiosError via a workaround
// import axios from 'axios';
// const { AxiosError, isAxiosError } = axios as any;

// import { BadRequestError, CurrentUserRequest, EventTypes, Events } from '@chronosrx/common';
// import { User } from '../models/user';
// import { attachCookie } from '../util/attachCookie';

// // Note: We assert that req.body is our expected type.
// // If you use express.json() middleware in your app setup, req.body will be an object.
// export const signup = async (req: Request, res: Response) => {
//   // Assert the type of req.body to include username and password.
//   const { username, password } = req.body as { username: string; password: string };

//   // Validate inputs
//   if (!username || !password || password.length < 4) {
//     throw new BadRequestError('Invalid inputs');
//   }

//   // Check if a user with the supplied username already exists
//   const existingUser = await User.findOne({ username });
//   if (existingUser) {
//     throw new BadRequestError('User with that username exists');
//   }

//   // Create the user document and save it
//   const newUser = User.build({ username, password });
//   await newUser.save();

//   // Create an event for the new user
//   const event: Events = {
//     type: EventTypes.USER_CREATED,
//     payload: {
//       id: newUser.id,
//       username: newUser.username,
//     },
//   };

//   // Post the event to the event bus
//   try {
//     await axios.post('http://localhost:3005/', { event });
//   } catch (err: unknown) {
//     // Use our workaround type guard, if available
//     if (isAxiosError && isAxiosError(err)) {
//       console.log(
//         `Failed to emit event USER_CREATED from auth: ${err.message || 'unknown error'}`
//       );
//     } else if (err instanceof Error) {
//       console.log(`Failed to emit event USER_CREATED from auth: ${err.message}`);
//     } else {
//       console.log('Failed to emit event USER_CREATED from auth: unknown error');
//     }
//   }

//   // Create a JWT and attach it to the response cookie
//   const token = newUser.createJwt();
//   attachCookie(res, token);

//   // Express's Response should have a status() method – if you’re getting errors here,
//   // ensure your tsconfig.json does not include "dom" in the "lib" array.
//   res.status(201).send(newUser);
// };

// export const login = async (req: Request, res: Response) => {
//   const { username, password } = req.body as { username: string; password: string };
//   if (!username || !password) {
//     throw new BadRequestError('Must provide username and password');
//   }
//   const existingUser = await User.findOne({ username });
//   if (!existingUser) {
//     throw new BadRequestError('Invalid credentials');
//   }
//   const passwordsMatch = await existingUser.comparePassword(password);
//   if (!passwordsMatch) {
//     throw new BadRequestError('Invalid credentials');
//   }
//   const token = existingUser.createJwt();
//   attachCookie(res, token);
//   res.status(200).send(existingUser);
// };

// export const logout = async (req: Request, res: Response) => {
//   res.cookie('token', null, {
//     httpOnly: true,
//     secure: false,
//     expires: new Date(Date.now() + 500),
//   });
//   res.status(200).send({ message: 'success' });
// };

// export const getCurrentUser = async (req: CurrentUserRequest, res: Response) => {
//   if (!req.currentUser) {
//     return res.status(200).send({ currentUser: null });
//   }
//   const user = await User.findById(req.currentUser);
//   res.status(200).send({ currentUser: user });
// };
import { Request, Response } from 'express';
import axios from 'axios';
import { BadRequestError, CurrentUserRequest, EventTypes, Events } from '@chronosrx/common';
import { User } from '../models/user.js';
import { attachCookie } from '../util/attachCookie.js';

export const signup = async (req: Request, res: Response) => {
  // Assert that req.body contains the expected properties
  const { username, password } = req.body as { username: string; password: string };

  // Validate inputs
  if (!username || !password || password.length < 4) {
    throw new BadRequestError('Invalid inputs');
  }

  // Check if a user with the supplied username already exists
  const existingUser = await User.findOne({ username });
  if (existingUser) {
    throw new BadRequestError('User with that username exists');
  }

  // Create and save the new user document
  const newUser = User.build({ username, password });
  await newUser.save();

  // Create an event for the new user
  const event: Events = {
    type: EventTypes.USER_CREATED,
    payload: {
      id: newUser.id,
      username: newUser.username,
    },
  };

  // Post the event to the event bus
  try {
    await axios.post('http://localhost:3005/', { event });
  } catch (err: unknown) {
    let errorMessage = 'unknown error';
    if (err instanceof Error) {
      errorMessage = err.message;
    }
    console.log(`Failed to emit event USER_CREATED from auth: ${errorMessage}`);
  }

  // Create a JWT and attach it to the response cookie
  const token = newUser.createJwt();
  attachCookie(res, token);

  res.status(201).send(newUser);
};

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body as { username: string; password: string };
  if (!username || !password) {
    throw new BadRequestError('Must provide username and password');
  }
  const existingUser = await User.findOne({ username });
  if (!existingUser) {
    throw new BadRequestError('Invalid credentials');
  }
  const passwordsMatch = await existingUser.comparePassword(password);
  if (!passwordsMatch) {
    throw new BadRequestError('Invalid credentials');
  }
  const token = existingUser.createJwt();
  attachCookie(res, token);
  res.status(200).send(existingUser);
};

export const logout = async (req: Request, res: Response) => {
  res.cookie('token', null, {
    httpOnly: true,
    secure: false,
    expires: new Date(Date.now() + 500),
  });
  res.status(200).send({ message: 'success' });
};

export const getCurrentUser = async (req: CurrentUserRequest, res: Response) => {
  if (!req.currentUser) {
    return res.status(200).send({ currentUser: null });
  }
  const user = await User.findById(req.currentUser);
  res.status(200).send({ currentUser: user });
};
