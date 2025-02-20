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
