import { Request, Response } from 'express';
import axios from 'axios';

import type {AxiosError} from 'axios/index';

import { BadRequestError, CurrentUserRequest, EventTypes, Events } from '@chronosrx/common';
import { User } from '../models/user';
import { attachCookie } from '../util/attachCookie';

export const signup = async (req: Request, res: Response) => {
  // console.log('💥 authController signup');
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

  // TODO PUBLISH AN EVENT TO THE EVENT BUS - type USER_CREATED, with data of user - user.id & username
  // console.log('Publishing event USER_CREATED');

  const event: Events = {
    type: EventTypes.USER_CREATED,
    payload: {
      id: newUser.id,
      username: newUser.username,
    },
  };
  try {
    await axios.post('http://localhost:3005/', {
      event,
    });
  } catch (err) {
    console.log(
      `Failed to emit event USER_CREATED from auth: ${
        (err as AxiosError).message || 'unknown error'
      } `
    );
  }

  // create a JWT w/ userId store on it
  // note: createJwt method created on the userSchema
  const token = newUser.createJwt();
  // set cookie on response object with name 'token' and value of the jwt
  // attachCookie method - defined in util folder
  attachCookie(res, token);

  //
  res.status(201).send(newUser);
};

export const login = async (req: Request, res: Response) => {
  // console.log('💥 authController login');
  // pull username and password off request body
  const { username, password } = req.body;
  // validate username and password - they exist
  if (!username || !password) {
    throw new BadRequestError('Must provide username and password');
  }
  // query database for user with that username
  const existingUser = await User.findOne({ username });
  // handle case where no user exists with that username
  if (!existingUser) {
    throw new BadRequestError('Invalid credentials');
  }

  // if user does exist - compare provided password to user's password in DB
  // * we defined a comparePassword method on the userSchema -> accepts provided password as argument
  // handle case when passwords do not match
  const passwordsMatch = await existingUser.comparePassword(password);
  if (!passwordsMatch) {
    throw new BadRequestError('Invalid credentials');
  }

  // if passwords do match - create a JWT
  // * we created a method createJwt on the userSchema that returns the jwt (aka token)
  const token = existingUser.createJwt();
  // attach the jwt to the cookie
  // * we defined an attachCookie helper function (in util folder) - is already imported for us
  // accepts the response object and jwt/token as arguments
  attachCookie(res, token);
  // send back the found user with status code 200
  res.status(200).send(existingUser);
};

export const logout = async (req: Request, res: Response) => {
  // console.log('💥 authController logout');

  // Set cookie on response object with name 'token' to null
  // make the cookie httpOnly
  // set cookie expiration to 500ms from now
  res.cookie('token', null, {
    httpOnly: true,
    secure: false,
    expires: new Date(Date.now() + 500),
  });

  res.status(200).send({ message: 'success' });
};

export const getCurrentUser = async (req: CurrentUserRequest, res: Response) => {
  // check request object for currentUser property
  if (!req.currentUser) {
    // if it doesn't exist send back status 200 with object with currentUser property set to null
    return res.status(200).send({ currentUser: null });
  }

  // if it does exist - use req.currentUser to find user in database by id
  const user = await User.findById(req.currentUser);
  // send back 200 with object with property currentUser set to the user from the database
  res.status(200).send({ currentUser: user });
};
