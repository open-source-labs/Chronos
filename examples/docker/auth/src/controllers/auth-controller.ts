import { Request, Response } from 'express';
import axios from 'axios';
// Remove import for AxiosError since it's not exported by your version of Axios
import { BadRequestError, CurrentUserRequest, EventTypes, Events } from '@chronosrx/common';
import { User } from '../models/user';
import { attachCookie } from '../util/attachCookie';

export const signup = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  // Validate inputs
  if (!username || !password || password.length < 4) {
    throw new BadRequestError('Invalid inputs');
  }

  // Check to see if user with supplied username already exists
  const existingUser = await User.findOne({ username });
  if (existingUser) {
    throw new BadRequestError('User with that username exists');
  }

  // create the user document
  const newUser = User.build({
    username,
    password,
  });
  // save newly created user document to the database
  await newUser.save();

  // Create an event for the new user
  const event: Events = {
    type: EventTypes.USER_CREATED,
    payload: {
      id: newUser.id,
      username: newUser.username,
    },
  };

  try {
    await axios.post('http://event-bus:3005/', { event });
  } catch (err) {
    if (err instanceof Error) {
      console.log(`Failed to emit event USER_CREATED from auth: ${err.message || 'unknown error'}`);
    } else {
      console.log('Failed to emit event USER_CREATED from auth: unknown error');
    }
  }

  // create a JWT using the method on the user document
  const token = newUser.createJwt();
  // attach the JWT to the response cookie
  attachCookie(res, token);

  res.status(201).send(newUser);
};

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;
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
